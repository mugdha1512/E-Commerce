import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white shadow-gray-200 my-5 rounded-lg shadow-lg overflow-hidden w-full max-w-[15rem] p-4 border border-gray-200">
      {/* Image box */}
      <div className="h-[13rem] w-full">
        <img
          className="object-contain w-full h-full rounded-lg shadow-md"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      {/* Text box */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.title}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
