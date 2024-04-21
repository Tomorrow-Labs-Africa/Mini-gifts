import React from "react";

interface CardButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<CardButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block bg-blue-500 text-white shadow-md hover:shadow-lg rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    >
      <div className="p-3">
        <p className="text-lg font-medium">{text}</p>
      </div>
    </button>
  );
};

export default Button;
