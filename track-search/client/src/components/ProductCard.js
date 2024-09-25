import React from "react";

const ProductCard = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-16">
      {products.map((product) => (
        <a
          href={`http://localhost:3004/products/${product._id}`}
          className="product-card"
        >
          <div className="product-card_img-container">
            <img
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="product-card_img"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="product-title">{product.title}</h3>

            <div className="flex justify-between">
              <p className="text-black opacity-50 text-lg capitalize">
                {product.category}
              </p>

              <p className="text-black text-lg font-semibold">
                <span>{product?.currency}</span>
                <span>{product?.currentPrice}</span>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProductCard;
