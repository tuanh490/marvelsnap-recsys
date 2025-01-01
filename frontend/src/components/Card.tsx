import React, { useState, useRef } from "react";

interface CardProps {
  name: string;
  art: string;
  size?: string;
  disableGreyOut?: boolean;
  isGreyedOut?: boolean;
  ability: string;
  series: string;
}

const Card: React.FC<CardProps> = ({
  name,
  art,
  ability,
  series,
  size = "w-40",
  disableGreyOut = true,
  isGreyedOut = false,
}) => {
  const [isActive, setIsActive] = useState(isGreyedOut);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disableGreyOut) {
      setIsActive(!isActive);
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const hoverWidth = 200;
      const screenWidth = window.innerWidth;

      if (cardRect.right + hoverWidth > screenWidth) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={handleClick}
        className={`${size} overflow-hidden transition-transform transform hover:scale-105 cursor-pointer`}
      >
        <img
          src={art}
          alt={name}
          className={`w-full object-contain transition-all duration-300 ${
            isActive ? "grayscale" : "grayscale-0"
          }`}
        />
      </div>
      {isHovered && (
        <div
          className={`absolute top-0 ${
            position === "right" ? "left-full ml-2" : "right-full mr-2"
          } bg-black bg-opacity-90 text-white p-4 flex flex-col justify-center items-start rounded shadow-lg z-10 w-48`}
        >
          <h2 className="font-bold text-lg mb-2">{name}</h2>
          <p className="text-sm italic mb-2">"{ability}"</p>
          <p className="text-xs text-gray-400">Series: {series}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
