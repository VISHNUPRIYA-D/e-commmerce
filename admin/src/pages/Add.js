import React, { useState } from "react";
import upload from "../assets/upload.jpg";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ token }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Women'Clothing");
  const [subCategory, setSubCategory] = useState("Shirts");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [brand, setBrand] = useState("");

  const sizeOptions = {
    clothing: ["S", "M", "L", "XL", "XXL"],
    pants: ["28", "30", "32", "34", "36", "38"],
    footwear: ["6", "7", "8", "9", "10", "11"],
  };

  const getAvailableSizes = () => {
    if (category.includes("Clothing") && subCategory !== "Jeans") {
      return sizeOptions.clothing;
    }

    if (subCategory === "Jeans" || subCategory === "Shorts") {
      return sizeOptions.pants;
    }

    if (category === "Footwear") {
      return sizeOptions.footwear;
    }

    return []; // No sizes for Makeup, Skincare, Home Essentials, etc.
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("product_name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("main_category", category);
    formData.append("subcategory", subCategory);
    formData.append("brand", brand);
    formData.append("image_url", image);
    formData.append("bestseller", bestseller);
    formData.append(
      "sizes",
      JSON.stringify(getAvailableSizes().length > 0 ? sizes : [])
    );

    try {
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setImage(false);
        setPrice("");
        setCategory("Women's Clothing");
        setSubCategory("Shirts");
        setBestseller(false);
        setBrand("");
        setSizes([]);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error.Please try again");
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <p>Upload Image</p>
        <div className="flex flex-col justify-start">
          <label htmlFor="image">
            <img
              src={!image ? upload : URL.createObjectURL(image)}
              alt=""
              className={`sm:w-32 border border-gray-400 mt-5 cursor-pointer ${
                !image ? "opacity-70" : "opacity-100"
              }`}
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter product name"
          className="w-full px-2 py-1"
        />
      </div>

      <div className="w-full">
        <p className="my-2">Product description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Enter product decription"
          className="w-full px-2 py-1"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="my-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-1 py-1"
          >
            <option value={"Men's Clothing"}>Men</option>
            <option value={"Women's Clothing"}>Women</option>
            <option value={"Kid's clothing"}>Kids</option>
            <option value={"Footwear"}>Footwear</option>
            <option value={"Beauty & Personal Care"}>
              Beauty & Personal Care
            </option>
            <option value={"Home Essentials"}>Home Esssentials</option>
            <option value={"Accessories"}>Accessories</option>
          </select>
        </div>

        <div>
          <p className="my-2">Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-1"
          >
            <option value="Shirts">Shirts</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Suits">Suits</option>
            <option value="Dresses">Dresses</option>
            <option value="Tops">Tops</option>
            <option value="Skirts">Skirts</option>
            <option value="Sarees">Sarees</option>
            <option value="Shorts">Shorts</option>
            <option value="Frocks">Frocks</option>
            <option value="School Uniforms">School Uniforms</option>
            <option value="Sleepwear">Sleepwear</option>
            <option value="Men's Shoes">Men's Shoes</option>
            <option value="Women's Sandals">Women's Sandals</option>
            <option value="Kid's Shoes">Kid's Shoes</option>
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Makeup">Makeup</option>
            <option value="Fragrances">Fragrances</option>
            <option value="Curtains">Curtains</option>
            <option value="Bedsheets">Bedsheets</option>
            <option value="Towels">Towels</option>
            <option value="Kitchen Tools">Kitchen Tools</option>
            <option value="Wallets">Wallets</option>
          </select>
        </div>

        <div>
          <p className="my-2">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="Number"
            placeholder="Enter price"
            className="px-2 py-1"
          />
        </div>
      </div>
      <div>
        <div>
          <p className="my-2">Product Size</p>
          <div className="flex flex-wrap gap-4 ">
            {getAvailableSizes().map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  value={sizes}
                  checked={sizes.includes(size)}
                  name="sizes"
                  className="cursor-pointer"
                />

                <span>{size}</span>
              </label>
            ))}
            
            {getAvailableSizes().length === 0 && (
              <p className="text-sm text-gray-500">
                No sizes required for this category.
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="my-2">Brand</p>
        <input
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          placeholder="Enter brand"
          className="px-2 py-1"
        />
      </div>

      <div className="flex gap-2 mt-2 cursor-pointer">
        <input
          type="checkbox"
          id="bestseller"
          className="cursor-pointer"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-2 px-4 rounded bg-black text-white my-2"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
