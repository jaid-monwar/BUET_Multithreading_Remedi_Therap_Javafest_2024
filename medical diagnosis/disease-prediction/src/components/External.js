import React from "react";
import { Link } from "react-router-dom";

// const External = () => {
//   return (
//     <div style={{ background: "#000", color: "violet", textAlign: "center" }}>
//       <h1>Multiple Disease Prediction</h1>
//       <Link to="/heart">
//         <button>Heart Disease Prediction</button>
//       </Link>
//       <Link to="/kidney">
//         <button>Kidney Disease Prediction</button>
//       </Link>
//       <Link to="/diabetes">
//         <button>Diabetes Prediction</button>
//       </Link>
//     </div>
//   );
// };

// export default External;

const products = [
  {
    id: 1,
    name: "Heart Disease Prediction",
    to: "/heart",
    imageSrc: "heart.png",
    imageAlt: "heart logo",
  },
  {
    id: 2,
    name: "Kidney Disease Prediction",
    to: "/kidney",
    imageSrc: "kidney.png",
    imageAlt: "kidney logo",
  },
  {
    id: 3,
    name: "Diabetes Prediction",
    to: "/diabetes",
    imageSrc: "diabetes.png",
    imageAlt: "diabetes machine logo",
  },
  {
    id: 4,
    name: "Brain Tumor Detection",
    to: "/brain-tumor",
    imageSrc: "brain.png",
    imageAlt: "brain logo",
  },
  {
    id: 5,
    name: "Pneumonia Detection",
    to: "/pneumonia",
    imageSrc: "pneumonia.png",
    imageAlt: "lungs logo",
  },
];

export default function External() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Services</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={product.to} key={product.id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-700">
                {product.name}
              </h3>
              {/* <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
