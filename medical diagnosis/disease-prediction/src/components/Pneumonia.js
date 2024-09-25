// import React, { useState } from "react";
// import axios from "axios";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// export default function Pneumonia() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [prediction, setPrediction] = useState("");

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//     setImagePreview(URL.createObjectURL(e.target.files[0]));
//     setPrediction("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     setPrediction(""); // Clear previous prediction
//     const response = await axios.post(
//       "http://localhost:5000/predict_pneumonia",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     setPrediction(response.data);
//   };

//   return (
//     <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
//       <div
//         aria-hidden="true"
//         className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
//       >
//         <div
//           style={{
//             clipPath:
//               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//           }}
//           className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
//         />
//       </div>
//       <div className="mx-auto max-w-2xl text-center">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Pneumonia Detection
//         </h2>
//         <p className="mt-2 text-lg leading-8 text-gray-600">
//           Upload an image to detect the presence of pneumonia.
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
//         <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//           <div className="col-span-full">
//             <label
//               htmlFor="imageUpload"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Upload Image
//             </label>
//             <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//               <div className="text-center">
//                 <PhotoIcon
//                   aria-hidden="true"
//                   className="mx-auto h-12 w-12 text-gray-300"
//                 />
//                 <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="file-upload"
//                       name="file-upload"
//                       type="file"
//                       accept=".png, .jpg, .jpeg"
//                       onChange={handleFileChange}
//                       className="sr-only"
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs leading-5 text-gray-600">
//                   PNG, JPG, GIF up to 10MB
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {imagePreview && (
//           <div className="mt-6">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mx-auto w-48 h-48 object-cover rounded-lg"
//             />
//           </div>
//         )}
//         <div className="mt-10">
//           <button
//             type="submit"
//             className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Predict
//           </button>
//         </div>
//         {prediction && (
//           <div className="mt-10">
//             <h4 className="text-xl font-semibold leading-6 text-gray-900">
//               {prediction}
//             </h4>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/solid";
import AgentChat from "./AgentChat";

export default function Pneumonia() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setPrediction("");
  };

  const generatePrompt = (prediction) => {
    return `The pneumonia detection result is: ${prediction}.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setPrediction(""); // Clear previous prediction

    try {
      const response = await axios.post(
        "http://localhost:5000/predict_pneumonia",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data);

      const promptText = generatePrompt(response.data);
      setTimeout(() => {
        setPrompt(promptText);
      }, 2000); // Wait for 2 seconds to set the prompt
    } catch (error) {
      console.error("Error uploading file:", error);
      setPrediction("Error in prediction. Please try again.");
    }
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
              Pneumonia Detection
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Upload an image to detect the presence of pneumonia.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="imageUpload"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-6">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto w-48 h-48 object-cover rounded-lg"
                />
              </div>
            )}
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
