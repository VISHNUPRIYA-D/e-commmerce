import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 mt-4">
      {/*left side  */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <p className="w-8 md-w-11 h-[2px] bg-purple-400 my-2"></p>
            <p className="font-medium text-sm md-text-base block">
              OUR BEST SELLER
            </p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed block">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className=" font-semibold text-sm md-text-base block">
              SHOP NOW
            </p>
            <p className="w-8 md-11 h-[2px] bg-purple-400"></p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <img
          src="https://jooinn.com/images/fashion-model-1.jpg"
          alt="hero"
          className="w-full sm:w-1/2"
        />
    </div>
  );
};

export default Hero;
