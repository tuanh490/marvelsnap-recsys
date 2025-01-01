import React, { useState } from "react";

interface CardProps {
  cardName: string;
  cardImageUrl: string;
  cardSize: string;
  disableGreyOut?: boolean;
}

const Card: React.FC<CardProps> = ({
  cardName,
  cardImageUrl,
  cardSize = "w-40",
  disableGreyOut = true,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disableGreyOut) {
      setIsActive(!isActive);
    }
  };

  return (
    <a target="_blank" rel="noopener noreferrer">
      <div
        onClick={handleClick}
        className={`${cardSize} overflow-hidden transition-transform transform hover:scale-105 cursor-pointer`}
      >
        <img
          src={cardImageUrl}
          alt={cardName}
          className={`w-full object-contain transition-all duration-300 ${
            isActive ? "grayscale" : "grayscale-0"
          }`}
        />
      </div>
    </a>
  );
};

export default Card;
