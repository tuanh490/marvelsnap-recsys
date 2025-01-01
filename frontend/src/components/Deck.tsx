import React from "react";
import Card from "./Card";
import { Card as CardUI, CardContent, Typography } from "@mui/material";

interface DeckProps {
  cards: {
    name: string;
    art: string;
    ability: string;
    series: string;
  }[];
  cardSize: string;
  deckTitle: string;
  deckDescription: string;
}

const Deck: React.FC<DeckProps> = ({
  cards,
  deckTitle,
  deckDescription,
  cardSize = "w-32",
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-stone-900 to-gray-900 max-w-3xl border-2 border-solid border-black rounded-md">
      <CardUI className="bg-gradient-to-r from-gray-800 via-stone-900 to-gray-900 border-0 border-b-2 border-solid border-black max-w-3xl p-4 shadow-lg text-white">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="font-semibold font-orbitron"
          >
            {deckTitle}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="mt-2 text-white font-orbitron"
          >
            {deckDescription}
          </Typography>
        </CardContent>
      </CardUI>

      <div className="py-2 grid grid-cols-3 sm:grid-cols-6 gap-4">
        {cards.slice(0, 12).map((card, index) => (
          <Card
            key={index}
            name={card.name}
            ability={card.ability}
            series={card.series}
            art={card.art}
            size={cardSize}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
