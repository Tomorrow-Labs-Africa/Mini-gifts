import React from "react";

interface CardButtonProps {
  image: string;
  text: string;
  onClick: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ image, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="w-full h-48">
        <img src={image} alt="Card" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-gray-900 text-lg font-medium">{text}</p>
      </div>
    </button>
  );
};

export default CardButton;
