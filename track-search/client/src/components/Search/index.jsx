// import styles from "./styles.module.css";

const Search = ({ setSearch }) => {
  return (
    <form className="flex flex-wrap gap-4 mt-12">
      <input
        type="text"
        //   className={styles.search}
        placeholder="Search for a product..."
        className="searchbar-input"
        onChange={({ currentTarget: input }) => setSearch(input.value)}
      />

      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default Search;
