import os
import numpy as np
from PIL import Image
import cv2
from flask import Flask, request, render_template, jsonify
from werkzeug.utils import secure_filename
from keras.models import Model
from keras.layers import Input, Flatten, Dense, Dropout
from keras.applications.vgg19 import VGG19
import pickle
from flask_cors import CORS
from crewai import Agent, Task, Crew, Process
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchRun
from crewai_tools import tool
from openai import OpenAI
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
CORS(app)

# Load heart, kidney, and diabetes models
working_dir = os.path.dirname(os.path.abspath(__file__))
heart_disease_model = pickle.load(open(f'{working_dir}/saved_models/heart.pkl', 'rb'))
kidney_disease_model = pickle.load(open(f'{working_dir}/saved_models/kidney.pkl', 'rb'))
diabetes_model = pickle.load(open(f'{working_dir}/saved_models/diabetes.pkl', 'rb'))

# Load brain tumor detection model
base_model_brain = VGG19(include_top=False, input_shape=(240, 240, 3))
x = base_model_brain.output
flat = Flatten()(x)
class_1 = Dense(4608, activation='relu')(flat)
drop_out = Dropout(0.2)(class_1)
class_2 = Dense(1152, activation='relu')(drop_out)
output = Dense(2, activation='softmax')(class_2)
model_brain_tumor = Model(base_model_brain.inputs, output)
model_brain_tumor.load_weights('vgg_unfrozen_brain.h5')

# Load pneumonia detection model
base_model_pneumonia = VGG19(include_top=False, input_shape=(240, 240, 3))
x = base_model_pneumonia.output
flat = Flatten()(x)
class_1 = Dense(4608, activation='relu')(flat)
drop_out = Dropout(0.2)(class_1)
class_2 = Dense(1152, activation='relu')(drop_out)
output = Dense(2, activation='softmax')(class_2)
model_pneumonia = Model(base_model_pneumonia.inputs, output)
model_pneumonia.load_weights('vgg_unfrozen_pneumonia.h5')

# Agentic RAG setup
OPENAI_API_KEY = ""
client = OpenAI(api_key=OPENAI_API_KEY)

# Update the LLM setup
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.5, openai_api_key=OPENAI_API_KEY)

@tool('DuckDuckGoSearch')
def search(search_query: str):
    """Search the web for information on a given topic."""
    return DuckDuckGoSearchRun().run(search_query)

def create_crewai_setup(prompt):
    # Define Doctor Agent
    doctor_agent = Agent(
        role="Doctor Agent",
        goal=f"""Analyze the patient information: {prompt}. 
                 Provide initial feedback on the patient's condition and suggest the next steps 
                 including necessary tests and initial lifestyle changes.""",
        backstory=f"""Medical professional experienced in assessing overall health and providing initial diagnosis 
                      based on symptoms. Can refer to a specialist for detailed analysis.""",
        verbose=True,
        llm=llm,
        allow_delegation=True,
        tools=[search],
    )

    # Define Specialist Agent
    specialist_agent = Agent(
        role="Specialist Agent",
        goal=f"""Provide a detailed analysis and recommendations for managing the patient's condition based on the information: {prompt}. 
                 Include advice on further diagnostic tests, potential treatments, and specialist consultations.""",
        backstory=f"""Specialized medical expert skilled in providing comprehensive analysis and treatment 
                      recommendations for specific conditions.""",
        verbose=True,
        llm=llm,
        allow_delegation=True,
        tools=[search],
    )

    # Define Tasks
    task1 = Task(
        description=f"""Analyze the patient information and provide feedback on the condition: {prompt}. 
                        Suggest initial diagnostic tests and lifestyle changes.""",
        agent=doctor_agent,
        llm=llm,
        expected_output="Initial feedback, diagnostic tests, and lifestyle change suggestions."
    )

    task2 = Task(
        description=f"""Provide a detailed analysis and recommendations for managing the condition based on the information: {prompt}. 
                        Include further diagnostic tests, potential treatments, and specialist consultations.""",
        agent=specialist_agent,
        llm=llm,
        expected_output="Detailed analysis, further tests, treatment recommendations, and specialist consultations."
    )

    # Create Crew
    health_crew = Crew(
        agents=[doctor_agent, specialist_agent],
        tasks=[task1, task2],
        verbose=2,
        process=Process.sequential,
    )

    # Create and Run the Crew
    crew_result = health_crew.kickoff()

    return crew_result

print('Models loaded. Check http://127.0.0.1:5000/')

# Utility functions for brain tumor detection
def get_className_brain(classNo):
    if classNo == 1:
        return "The patient has potential brain tumor"
    elif classNo == 0:
        return "The patient does NOT have potential brain tumor"

def getResult_brain(img):
    image = cv2.imread(img)
    image = Image.fromarray(image, 'RGB')
    image = image.resize((240, 240))
    image = np.array(image)
    input_img = np.expand_dims(image, axis=0)
    result = model_brain_tumor.predict(input_img)
    result01 = np.argmax(result, axis=1)
    return result01

# Utility functions for pneumonia detection
def get_className_pneumonia(classNo):
    if classNo == 0:
        return "The patient does NOT have potential pneumonia"
    elif classNo == 1:
        return "The patient has potential pneumonia"

def getResult_pneumonia(img):
    image = cv2.imread(img)
    image = Image.fromarray(image, 'RGB')
    image = image.resize((240, 240))
    image = np.array(image)
    input_img = np.expand_dims(image, axis=0)
    result = model_pneumonia.predict(input_img)
    result01 = np.argmax(result, axis=1)
    return result01

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    data = request.get_json()
    user_input = [
        data['age'], data['sex'], data['cp'], data['trestbps'],
        data['chol'], data['fbs'], data['restecg'], data['thalach'],
        data['exang'], data['oldpeak'], data['slope'], data['ca'],
        data['thal']
    ]
    user_input = [float(x) for x in user_input]
    prediction = heart_disease_model.predict([user_input])
    if prediction[0] == 1:
        prediction_text = "This person has potential heart disease"
    else:
        prediction_text = "This person does NOT have potential heart disease"
    return jsonify({'prediction': prediction_text})

@app.route('/predict_kidney', methods=['POST'])
def predict_kidney():
    data = request.get_json()
    user_input = [
        data['age'], data['blood_pressure'], data['specific_gravity'], 
        data['albumin'], data['sugar'], data['red_blood_cells'], 
        data['pus_cell'], data['pus_cell_clumps'], data['bacteria'], 
        data['blood_glucose_random'], data['blood_urea'], data['serum_creatinine'], 
        data['sodium'], data['potassium'], data['haemoglobin'], 
        data['packed_cell_volume'], data['white_blood_cell_count'], 
        data['red_blood_cell_count'], data['hypertension'], 
        data['diabetes_mellitus'], data['coronary_artery_disease'], 
        data['appetite'], data['peda_edema'], data['aanemia']
    ]
    user_input = [float(x) for x in user_input]
    prediction = kidney_disease_model.predict([user_input])
    if prediction[0] == 1:
        prediction_text = "The person has potential kidney disease"
    else:
        prediction_text = "The person does NOT have potential kidney disease"
    return jsonify({'prediction': prediction_text})

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    data = request.get_json()
    Pregnancies = data['Pregnancies']
    Glucose = data['Glucose']
    BloodPressure = data['BloodPressure']
    SkinThickness = data['SkinThickness']
    Insulin = data['Insulin']
    BMI = data['BMI']
    DiabetesPedigreeFunction = data['DiabetesPedigreeFunction']
    Age = data['Age']

    NewBMI_Overweight = 0
    NewBMI_Underweight = 0
    NewBMI_Obesity_1 = 0
    NewBMI_Obesity_2 = 0 
    NewBMI_Obesity_3 = 0
    NewInsulinScore_Normal = 0 
    NewGlucose_Low = 0
    NewGlucose_Normal = 0 
    NewGlucose_Overweight = 0
    NewGlucose_Secret = 0

    if float(BMI) <= 18.5:
        NewBMI_Underweight = 1
    elif 18.5 < float(BMI) <= 24.9:
        pass
    elif 24.9 < float(BMI) <= 29.9:
        NewBMI_Overweight = 1
    elif 29.9 < float(BMI) <= 34.9:
        NewBMI_Obesity_1 = 1
    elif 34.9 < float(BMI) <= 39.9:
        NewBMI_Obesity_2 = 1
    elif float(BMI) > 39.9:
        NewBMI_Obesity_3 = 1

    if 16 <= float(Insulin) <= 166:
        NewInsulinScore_Normal = 1

    if float(Glucose) <= 70:
        NewGlucose_Low = 1
    elif 70 < float(Glucose) <= 99:
        NewGlucose_Normal = 1
    elif 99 < float(Glucose) <= 126:
        NewGlucose_Overweight = 1
    elif float(Glucose) > 126:
        NewGlucose_Secret = 1

    user_input = [
        Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age, 
        NewBMI_Underweight, NewBMI_Overweight, NewBMI_Obesity_1, NewBMI_Obesity_2, NewBMI_Obesity_3, 
        NewInsulinScore_Normal, NewGlucose_Low, NewGlucose_Normal, NewGlucose_Overweight, NewGlucose_Secret
    ]
    user_input = [float(x) for x in user_input]
    prediction = diabetes_model.predict([user_input])
    if prediction[0] == 1:
        prediction_text = "The person has potential diabetes"
    else:
        prediction_text = "The person does NOT have potential diabetes"
    return jsonify({'prediction': prediction_text})

@app.route('/predict_brain_tumor', methods=['POST'])
def predict_brain_tumor():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        value = getResult_brain(file_path)
        result = get_className_brain(value) 
        return result
    return None

@app.route('/predict_pneumonia', methods=['POST'])
def predict_pneumonia():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        value = getResult_pneumonia(file_path)
        result = get_className_pneumonia(value) 
        return result
    return None

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    # age = data.get('age')
    # gender = data.get('gender')
    disease = data.get('disease')
    # result = create_crewai_setup(age, gender, disease)
    result = create_crewai_setup(disease)
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)


