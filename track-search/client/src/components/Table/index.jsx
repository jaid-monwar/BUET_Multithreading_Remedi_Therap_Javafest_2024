import styles from "./styles.module.css";

const Table = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p className={styles.title_tab}>Title</p>
        <p className={styles.genre_tab}>Category</p>
        <p className={styles.rating_tab}>Current Price</p>
      </div>
      {products.map((product) => (
        <div className={styles.movie} key={product._id}>
          <a
            href={`http://localhost:3004/products/${product._id}`}
            className={styles.title_container}
          >
            <img
              src={product.image}
              alt="product"
              className={styles.movie_img}
            />
            <p className={styles.movie_title}>
              {product.title} ({product.currentPrice})
            </p>
          </a>
          {/* <div className={styles.genre_container}>
            {product.genre.map((genre, index) => (
              <p key={genre} className={styles.movie_genre}>
                {genre}
                {index !== product.genre.length - 1 && "/"}
              </p>
            ))}
          </div> */}
          {/* <div className={styles.rating_container}>
            <img
              src="./images/star.png"
              alt="star"
              className={styles.star_img}
            />
            <p className={styles.movie_rating}>{product.rating}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Table;
