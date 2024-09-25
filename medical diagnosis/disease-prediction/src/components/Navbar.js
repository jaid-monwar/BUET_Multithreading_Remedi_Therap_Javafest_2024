import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Heart Disease Prediction",
    to: "/heart",
  },
  {
    id: 2,
    name: "Kidney Disease Prediction",
    to: "/kidney",
  },
  {
    id: 3,
    name: "Diabetes Prediction",
    to: "/diabetes",
  },
  {
    id: 4,
    name: "Brain Tumor Detection",
    to: "/brain-tumor",
  },
  {
    id: 5,
    name: "Pneumonia Detection",
    to: "/pneumonia",
  },
];

export default function Navbar() {
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Disease Detection Services
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-20">
            <div className="gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Services</h3> */}
                <div
                  //   role="list"
                  className="space-y-4 pb-6 font-medium text-gray-900 text-xl"
                >
                  {products.map((product) => (
                    <Link to={product.to} key={product.id} className="group">
                      <div className="pt-5">
                        <div>{product.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
