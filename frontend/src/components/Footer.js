import React from "react";
import appLogo from "../assets/app-logo.png";
import smallAppLogo from '../assets/mini-app-logo.png';
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <picture className="cursor-pointer">
            {/* Source for small devices  */}
            <source media="(max-width: 440px)" srcSet={smallAppLogo} />

            {/* Fallback for larger devices */}
            <img src={appLogo} alt="logo" className=" xs:w-32 rounded w-10" />
          </picture>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
            quisquam asperiores inventore voluptatem! Illum sapiente sit saepe
            esse ducimus modi earum placeat molestias quia adipisci.
          </p>
        </div>
        <div >
          <p className="text-xl fontimedium mt-10 mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mt-10 mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
              <li>(555) 123-9472</li>
              <li>info@buybuddy.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center ">Copyright {year} @ buybuddy.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
