import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDropright } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products,search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
 useEffect(() => {
  let productsCopy = products.slice();

  if (category.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      category.includes(item.main_category)
    );
  }

  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter((item) =>
      subCategory.includes(item.subcategory)
    );
  }
  if(showSearch && search){
    productsCopy = productsCopy.filter(item => item.product_name.toLowerCase().includes(search.toLowerCase()))
  }

  // Apply sort directly here instead of separately
  switch (sortType) {
    case 'low-high':
      productsCopy.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      productsCopy.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  setFilterProducts(productsCopy);
}, [products, category, subCategory, sortType,showSearch,search]);



  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
      console.log(subCategory);
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <IoIosArrowDropright
            className={`flex sm:hidden ${
              showFilter ? "rotate-90" : ""
            } text-gray-500 text-sm cursor-pointer`}
          />
        </p>

        {/* CAtegory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men's Clothing"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Women's Clothing"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kid's clothing"}
                onChange={toggleCategory}
              />
              Kids
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Footwear"}
                onChange={toggleCategory}
              />
              Footwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Beauty & Personal Care"}
                onChange={toggleCategory}
              />
              Beauty & Personal Care
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Home Essentials"}
                onChange={toggleCategory}
              />
              Home Essentials
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Accessories"}
                onChange={toggleCategory}
              />
              Accessories
            </p>
          </div> 
        </div>
        {/* SubCategory Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Shirts"}
                onChange={toggleSubCategory}
              />
              Shirts
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"T-shirts"}
                onChange={toggleSubCategory}
              />
              T-shirts
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Jeans"}
                onChange={toggleSubCategory}
              />
              Jeans
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Jackets"}
                onChange={toggleSubCategory}
              />
              Jackets
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Suits"}
                onChange={toggleSubCategory}
              />
              Suits
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Dresses"}
                onChange={toggleSubCategory}
              />
              Dresses
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Tops"}
                onChange={toggleSubCategory}
              />
              Tops
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Skirts"}
                onChange={toggleSubCategory}
              />
              Skirts
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Sarees"}
                onChange={toggleSubCategory}
              />
              Sarees
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Shorts"}
                onChange={toggleSubCategory}
              />
              Shorts
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Frocks"}
                onChange={toggleSubCategory}
              />
              Frocks
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"School Uniforms"}
                onChange={toggleSubCategory}
              />
              School Uniforms
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Sleepwear"}
                onChange={toggleSubCategory}
              />
              Sleepwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men's Shoes"}
                onChange={toggleSubCategory}
              />
              Men's Shoes
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Women's Sandals"}
                onChange={toggleSubCategory}
              />
              Women's Sandals
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kid's Shoes"}
                onChange={toggleSubCategory}
              />
              Kid's Shoes
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Skincare"}
                onChange={toggleSubCategory}
              />
              Skincare
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Haircare"}
                onChange={toggleSubCategory}
              />
              Haircare
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Makeup"}
                onChange={toggleSubCategory}
              />
              Makeup
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Fragrances"}
                onChange={toggleSubCategory}
              />
              Fragrances
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Curtains"}
                onChange={toggleSubCategory}
              />
              Curtains
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Bedsheets"}
                onChange={toggleSubCategory}
              />
              Bedsheets
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Towels"}
                onChange={toggleSubCategory}
              />
              Towels
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kitchen Tools"}
                onChange={toggleSubCategory}
              />
              Kitchen Tools
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Wallets"}
                onChange={toggleSubCategory}
              />
              Wallets
            </p>
          </div>
        </div>
      </div>
      {/* Roght Side */}
      <div className="flex-1">
        <div className="flex justify-between text-baase sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className="border border-gray-300 text-sm px-3 h-10 mt-5">
            <option value="relavent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/*Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image_url={item.image_url}
              product_name={item.product_name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
