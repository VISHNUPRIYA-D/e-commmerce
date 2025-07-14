import React from "react";
import Title from "../components/Title";
import about_img from "../assets/assets.js/about.webp";
import NewsBox from "../components/NewsBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={" US"} />
      </div>
      <p className=" flex flex-col justify-center items-center text-2xl text-gray-600">
        BuyBuddy
      </p>
      <div className="my-10 flex flex-col md:flex-row gap-6">
        <img className="w-full md:max-w-[450px]" src={about_img} alt="" />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At BuyBuddy, we're more than just an eCommerce platform—we're your
            smart, reliable shopping companion. Founded with the vision of
            making online shopping seamless, personal, and enjoyable, BuyBuddy
            brings together quality products, trusted sellers, and user-friendly
            technology all in one place.
          </p>
          <p>
            We’re constantly evolving to bring you better deals, smarter tools,
            and a richer shopping experience. At BuyBuddy, it’s not just about
            what you buy—it’s about who you buy with.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:w-3/4 justify-center items-center ml-auto mr-auto">
        <div className=" flex flex-col justify-center gap-6 md:w-full text-gray-600">
        <b className="">Our Vision</b>
        <p>
          To become the most trusted and customer-centric eCommerce platform,
          empowering people everywhere to shop smarter, faster, and more
          confidently—anytime, anywhere.
        </p>
        <b className="">Our Mission</b>
        <p>
          At BuyBuddy, our mission is to simplify and personalize online
          shopping by delivering quality products, seamless experiences, and
          exceptional service. We are committed to building a platform that
          supports both buyers and sellers, while continuously innovating to
          meet the evolving needs of the digital shopper.
        </p>
        <b>What We Do</b>
        <p>
    We help customers discover and buy products they love—effortlessly. Whether you're looking for the latest gadgets, 
    everyday essentials, fashion trends, or unique finds, BuyBuddy curates a wide range of products to suit every lifestyle and budget.
  </p>
  <b> Why Choose BuyBuddy?</b>
  <ul>
    <li>
      <strong>Smart Shopping Experience:</strong> Personalized recommendations, intuitive navigation, and secure checkout make shopping smooth and stress-free.
    </li>
    <li>
      <strong>Quality & Trust:</strong> We partner only with verified sellers and ensure that every product meets our quality standards.
    </li>
    <li>
      <strong>Fast & Reliable Delivery:</strong> From order to doorstep, we work hard to make sure your items arrive quickly and safely.
    </li>
    <li>
      <strong>Support That Cares:</strong> Our customer service team is here to help you at every step. Friendly, fast, and always ready to assist.
    </li>
  </ul>
      </div>
      </div>
      
      <div className="mt-20">
      <NewsBox />
      </div>
    </div>
  );
};

export default About;
