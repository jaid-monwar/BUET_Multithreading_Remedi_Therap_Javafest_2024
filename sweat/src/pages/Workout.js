import React, { useEffect, useRef, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import "../index.css";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";

export default function Workout() {
  const [workoutData, setWorkoutData] = useState(null);
  const [workoutText, setWorkoutText] = useState("");
  const [exerciseNames, setExerciseNames] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState([]);
  const [detailPlan, setDetailPlan] = useState([]);
  const [search, setSearch] = useState("");
  const [bodyPart, setBodyPart] = useState("all");

  let eventSourceRef = useRef(null);

  useEffect(() => {
    closeEventStream(); // Close any existing connection
  }, []);

  useEffect(() => {
    if (workoutData) {
      closeEventStream(); // Close any existing connection
      initializeEventStream(); // Open a new connection
    }
  }, [workoutData]);

  // Function to initialize the event stream
  // const initializeEventStream = () => {
  //   const workoutInputs = { ...workoutData };

  //   // Construct query parameters
  //   const queryParams = new URLSearchParams(workoutInputs).toString();
  //   // Open an SSE connection with these query parameters
  //   const url = `http://localhost:3002/workoutStream?${queryParams}`;
  //   eventSourceRef.current = new EventSource(url);

  //   eventSourceRef.current.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log(data);

  //       setWorkoutText((prev) => prev + data.chunk);

  //       let lines = data.chunk.split("\n");
  //       let startIndex = lines.indexOf("Names:") + 1;
  //       let endIndexExercise = lines.indexOf("Reps:");
  //       let endIndexReps = lines.indexOf("Detail Plan:");

  //       let tempExerciseNames = [];
  //       let tempReps = [];
  //       let tempDetailPlan = [];

  //       for (let i = startIndex; i < endIndexExercise; i++) {
  //         tempExerciseNames.push(lines[i]);
  //       }

  //       // console.log("tempExerciseNames: ", tempExerciseNames);

  //       function formatExercises(workouts) {
  //         return workouts.map((exercise) => {
  //           // Remove any leading digits and special characters
  //           let formattedExercise = exercise.replace(/^\d+\.\s*|\* /g, "");
  //           // Replace any "-" with a space
  //           formattedExercise = formattedExercise.replace(/-/g, " ");
  //           // Convert to lowercase
  //           // formattedExercise = formattedExercise.toLowerCase();
  //           // Ensure words are space-separated
  //           formattedExercise = formattedExercise
  //             .replace(/([A-Z])/g, " $1")
  //             .trim();
  //           return formattedExercise;
  //         });
  //       }

  //       const formattedExerciseNames = formatExercises(tempExerciseNames);

  //       // console.log("formattedExerciseNames: ", formattedExerciseNames);

  //       setExerciseNames(formattedExerciseNames.slice(1, 12));

  //       for (let i = endIndexExercise + 2; i < endIndexReps; i++) {
  //         tempReps.push(lines[i]);
  //       }

  //       setReps(tempReps);

  //       for (let i = endIndexReps + 2; i < lines.length; i++) {
  //         tempDetailPlan.push(lines[i]);
  //       }

  //       setDetailPlan(tempDetailPlan);
  //     } catch (error) {
  //       if (event.data === "[DONE]") {
  //         console.log("Stream finished");
  //       } else {
  //         console.error("Failed to parse JSON:", error);
  //       }
  //     }
  //   };

  //   console.log("Exercise Names: ", exerciseNames);
  //   console.log("Reps: ", reps);
  //   console.log("Detail Plan: ", detailPlan);

  //   eventSourceRef.current.onerror = () => {
  //     eventSourceRef.current.close();
  //   };
  // };

  // Function to initialize the event stream
  const initializeEventStream = () => {
    const workoutInputs = { ...workoutData };

    // Construct query parameters
    const queryParams = new URLSearchParams(workoutInputs).toString();
    // Open an SSE connection with these query parameters
    const url = `http://localhost:8082/workoutStream?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);

        setWorkoutText((prev) => prev + data.chunk);

        // Split the response text into lines
        let lines = data.chunk.split("\n");

        // Variables to hold extracted data
        let tempExerciseNames = [];
        let tempReps = [];
        let tempDetailPlan = [];

        let isNamesSection = false;
        let isRepsSection = false;
        let isDetailPlanSection = false;

        // Iterate through lines to classify and store data
        for (let line of lines) {
          line = line.trim(); // Remove any extra whitespace

          if (line.startsWith("Names:")) {
            isNamesSection = true;
            isRepsSection = false;
            isDetailPlanSection = false;
            continue;
          }

          if (line.startsWith("Reps:")) {
            isNamesSection = false;
            isRepsSection = true;
            isDetailPlanSection = false;
            continue;
          }

          if (line.startsWith("Detail Plan:")) {
            isNamesSection = false;
            isRepsSection = false;
            isDetailPlanSection = true;
            continue;
          }

          if (isNamesSection && line) {
            tempExerciseNames.push(line);
          } else if (isRepsSection && line) {
            tempReps.push(line);
          } else if (isDetailPlanSection && line) {
            tempDetailPlan.push(line);
          }
        }

        // Format exercise names as needed
        const formatExercises = (workouts) => {
          return workouts.map((exercise) => {
            // Remove any leading digits and special characters
            let formattedExercise = exercise.replace(/^\d+\.\s*|\* /g, "");
            // Replace any "-" with a space
            formattedExercise = formattedExercise.replace(/-/g, " ");
            // Ensure words are space-separated
            formattedExercise = formattedExercise
              .replace(/([A-Z])/g, " $1")
              .trim();
            return formattedExercise;
          });
        };

        const formattedExerciseNames = formatExercises(tempExerciseNames);

        // Set state variables with parsed data
        setExerciseNames(formattedExerciseNames);
        setReps(tempReps);
        setDetailPlan(tempDetailPlan);
      } catch (error) {
        if (event.data === "[DONE]") {
          console.log("Stream finished");
        } else {
          console.error("Failed to parse JSON:", error);
        }
      }
    };

    console.log("Exercise Names: ", exerciseNames);
    console.log("Reps: ", reps);
    console.log("Detail Plan: ", detailPlan);

    eventSourceRef.current.onerror = () => {
      eventSourceRef.current.close();
    };
  };

  // Function to close the event stream
  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  async function onSubmit(data) {
    // update state
    setWorkoutText("");
    setWorkoutData(data);
  }

  useEffect(() => {
    console.log(exerciseNames);
  }, [exerciseNames]);

  useEffect(() => {
    console.log(reps);
  }, [reps]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-6 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <WorkoutCard onSubmit={onSubmit} />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div className="border rounded-lg overflow-hidden shadow-lg font-['Segoe UI'] bg-white">
                <div className="space-y-12 mt-10 ml-5 mr-5">
                  <div className="border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
                      Recommended Exercises
                    </h2>
                    {exerciseNames?.map((item) => (
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div className="border rounded-lg overflow-hidden shadow-lg font-['Segoe UI'] bg-white">
                <div className="space-y-12 mt-10 ml-5 mr-5">
                  <div className="border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
                      Reps and Sets
                    </h2>
                    {reps?.map((item) => (
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <div className="border rounded-lg overflow-hidden shadow-lg font-['Segoe UI'] bg-white">
              <div className="space-y-12 mt-10 ml-5 mr-5">
                <div className="border-gray-900/10 pb-12">
                  {" "}
                  {/* Adjusted classes here */}
                  <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
                    Weekly Routine
                  </h2>
                  <div className="overflow-auto max-h-[640px]">
                    {detailPlan?.map((item, index) => (
                      <p
                        key={index}
                        className="mt-1 text-sm leading-6 text-gray-600"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
