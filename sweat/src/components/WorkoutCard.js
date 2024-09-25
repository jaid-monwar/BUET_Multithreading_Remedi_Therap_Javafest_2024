import React, { useState } from "react";

const WorkoutCard = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fitness, setFitness] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    const workoutData = {
      firstName,
      lastName,
      age,
      height,
      weight,
      bodyType,
      fitness,
      gender,
      goal,
    };
    onSubmit(workoutData);
  };

  return (
    <form className="border rounded-lg overflow-hidden shadow-lg font-['Segoe UI'] bg-white">
      <div className="space-y-12 mt-10 ml-5 mr-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Build Your Workout Routine
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Let's break some sweat!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  placeholder="First Name"
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age (years)
              </label>
              <div className="mt-2">
                <input
                  placeholder="Age"
                  type="text"
                  name="age"
                  id="age"
                  autoComplete="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="height"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Height (inches)
              </label>
              <div className="mt-2">
                <input
                  placeholder="Height"
                  type="text"
                  name="height"
                  id="height"
                  autoComplete="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="weight"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Weight (kg)
              </label>
              <div className="mt-2">
                <input
                  placeholder="Weight"
                  type="text"
                  name="weight"
                  id="weight"
                  autoComplete="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="body-type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Body Type
              </label>
              <div className="mt-2">
                <select
                  id="body-type"
                  name="body-type"
                  autoComplete="body-type"
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Lean</option>
                  <option>Athletic</option>
                  <option>Heavy</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="fitness"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fitness Level
              </label>
              <div className="mt-2">
                <select
                  id="fitness"
                  name="fitness"
                  autoComplete="fitness"
                  value={fitness}
                  onChange={(e) => setFitness(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Elite</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-5">
              <label
                htmlFor="goal"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Goal
              </label>
              <div className="mt-2">
                <input
                  placeholder="Goal of the Workout Routine"
                  type="text"
                  name="goal"
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="mr-5 rounded-md bg-[#F87474] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#F05454] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F05454]"
        >
          Build Routine
        </button>
      </div>
    </form>
  );
};

export default WorkoutCard;
