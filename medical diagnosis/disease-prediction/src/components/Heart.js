// // import React, { useState } from "react";
// // import axios from "axios";

// // function Heart() {
// //   const [formData, setFormData] = useState({
// //     age: "",
// //     sex: "",
// //     cp: "",
// //     trestbps: "",
// //     chol: "",
// //     fbs: "",
// //     restecg: "",
// //     thalach: "",
// //     exang: "",
// //     oldpeak: "",
// //     slope: "",
// //     ca: "",
// //     thal: "",
// //   });

// //   const [prediction, setPrediction] = useState("");

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const response = await axios.post(
// //       "http://localhost:5000/predict_heart",
// //       formData
// //     );
// //     setPrediction(response.data.prediction);
// //   };

// //   return (
// //     <div style={{ background: "#000", color: "violet" }}>
// //       <h1>Heart Disease Prediction Using Machine Learning</h1>
// //       <form onSubmit={handleSubmit}>
// //         {Object.keys(formData).map((key) => (
// //           <div key={key}>
// //             <input
// //               type="text"
// //               name={key}
// //               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
// //               value={formData[key]}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //         ))}
// //         <button type="submit">Predict</button>
// //       </form>
// //       {prediction && <h4>{prediction}</h4>}
// //     </div>
// //   );
// // }

// // export default Heart;

// import React, { useState } from "react";
// import axios from "axios";
// import AgentChat from "./AgentChat";

// export default function Heart() {
//   const [formData, setFormData] = useState({
//     age: "",
//     sex: "",
//     cp: "",
//     trestbps: "",
//     chol: "",
//     fbs: "",
//     restecg: "",
//     thalach: "",
//     exang: "",
//     oldpeak: "",
//     slope: "",
//     ca: "",
//     thal: "",
//   });

//   const [prediction, setPrediction] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:5000/predict_heart",
//       formData
//     );
//     setPrediction(response.data.prediction);
//   };

//   return (
//     <div className="flex">
//       <div className="w-9/12">
//         <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
//           <div
//             aria-hidden="true"
//             className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
//           >
//             <div
//               style={{
//                 clipPath:
//                   "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//               }}
//               className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
//             />
//           </div>
//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Heart Disease Prediction
//             </h2>
//             <p className="mt-2 text-lg leading-8 text-gray-600">
//               Enter your details to predict the risk of heart disease.
//             </p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="mx-auto mt-16 max-w-xl sm:mt-20"
//           >
//             <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
//               {Object.keys(formData).map((key) => (
//                 <div key={key}>
//                   <label
//                     htmlFor={key}
//                     className="block text-sm font-semibold leading-6 text-gray-900"
//                   >
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </label>
//                   <div className="mt-2.5">
//                     <input
//                       id={key}
//                       name={key}
//                       type="text"
//                       value={formData[key]}
//                       onChange={handleChange}
//                       required
//                       className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-10">
//               <button
//                 type="submit"
//                 className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Predict
//               </button>
//             </div>
//             {prediction && (
//               <div className="mt-10">
//                 <h4 className="text-xl font-semibold leading-6 text-gray-900">
//                   {prediction}
//                 </h4>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//       <div className="w-3/12">
//         <AgentChat />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import AgentChat from "./AgentChat";

export default function Heart() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [prediction, setPrediction] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePrompt = (formData, prediction) => {
    let promptText = "The patient information is as follows: ";
    for (const [key, value] of Object.entries(formData)) {
      promptText += `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } is ${value}, `;
    }
    promptText += `and the prediction is ${prediction}.`;
    return promptText;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/predict_heart",
      formData
    );
    setPrediction(response.data.prediction);

    const promptText = generatePrompt(formData, response.data.prediction);
    setTimeout(() => {
      console.log("Prompt Text: ", promptText);
      setPrompt(promptText);
    }, 2000); // Wait for 2 seconds to set the prompt
  };

  return (
    <div className="flex">
      <div className="w-8/12">
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Heart Disease Prediction
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Enter your details to predict the risk of heart disease.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Predict
              </button>
            </div>
            {prediction && (
              <div className="mt-10">
                <h4 className="text-xl font-semibold leading-6 text-gray-900">
                  {prediction}
                </h4>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="w-4/12">
        <AgentChat prompt={prompt} />
      </div>
    </div>
  );
}
