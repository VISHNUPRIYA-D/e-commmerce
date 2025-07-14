import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { IoStar,IoArrowBack } from "react-icons/io5";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10">Product not found or loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10 px-4 sm:px-8 lg:px-20 transition-opacity duration-500 opacity-100">
      <div className="mb-6">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center text-sm text-gray-700 hover:text-black transition"
  >
    <IoArrowBack className="text-xl mr-2" />
    
  </button>
</div>

      {/* Product Top Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
        <img
          src={`${backendUrl}/uploads/${productData.image_url}`}
          alt="Product"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm object-cover rounded-md"
        />

        <div className="w-full max-w-2xl text-center lg:text-left">
          <h1 className="text-2xl font-bold">{productData.product_name}</h1>

          <div className="flex items-center justify-center lg:justify-start gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <IoStar key={i} className="text-yellow-600" />
            ))}
            <IoStar className="text-yellow-600 opacity-30" />
            <p className="text-sm px-2">(120)</p>
          </div>

          <p className="mt-2 font-semibold text-lg">
            {currency} {productData.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mt-4">{productData.description}</p>

          {productData.sizes && (
            <div className="flex flex-col gap-4 my-8">
              <p className="font-semibold">Select Size</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border py-2 px-4 bg-gray-100 text-sm rounded-md hover:border-yellow-600 transition ${
                      item === size ? "border-yellow-500 font-semibold" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className="bg-black text-white px-6 py-3 text-sm rounded-md hover:bg-gray-800 transition w-full sm:w-auto"
            onClick={() => addToCart(productData._id, size)}
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 mx-auto lg:mx-0" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className="mt-16">
        <div className="flex flex-wrap text-sm">
          <button className="border px-4 py-2 font-semibold bg-gray-100">
            Description
          </button>
          <button className="border px-4 py-2">Reviews (122)</button>
        </div>
        <div className="flex flex-col gap-4 border p-4 text-sm text-gray-600">
          <p>
            Experience the perfect balance of comfort, durability, and modern
            design — made for daily use and lasting performance.
          </p>
          <p>
            Crafted with attention to detail and premium materials, this piece
            elevates everyday essentials with a touch of luxury.
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-10 space-y-3 px-4 sm:px-6">
        <h3 className="font-bold text-md mb-2">Product details</h3>
        <p>
          <span className="font-semibold">Product name:</span>{" "}
          {productData.product_name}
        </p>
        <p>
          <span className="font-semibold">Brand:</span> {productData.brand}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {currency}{" "}
          {productData.price.toFixed(2)}
        </p>
        <p className="flex flex-wrap gap-1">
          <span className="font-semibold">Available sizes:</span>
          {productData.sizes.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </p>
        <p>
          <span className="font-semibold">Category:</span>{" "}
          {productData.main_category} ({productData.subcategory})
        </p>
      </div>

      {/* Related Products */}
      <div className="mt-14">
        <RelatedProducts
          category={productData.main_category}
          subCategory={productData.subcategory}
        />
      </div>
    </div>
  );
};

export default Product;
