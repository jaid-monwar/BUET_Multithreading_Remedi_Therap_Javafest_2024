import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import ProductCard from "./components/ProductCard";
import "./App.css";
import Navbar from "./components/Navbar";

const base_url = process.env.REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState({});
  // const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  //   const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const url = `${base_url}?page=${page}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, [page, search]);

  return (
    <>
      <Navbar />
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16 justify-center">
          <div className="flex flex-col justify-center">
            {/* <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p> */}

            <h1 className="head-text">
              <span className="text-primary">Track </span>
              your medicine for the best Prices
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and price analytics to help you find
              the medicince at the best price for you.
            </p>

            <Search setSearch={(search) => setSearch(search)} />
          </div>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">All Products</h2>

        <ProductCard products={obj.products ? obj.products : []} />
        {/* <Pagination
            page={page}
            limit={obj.limit ? obj.limit : 0}
            total={obj.total ? obj.total : 0}
            setPage={(page) => setPage(page)}
          /> */}
      </section>
    </>
  );
}

export default App;
