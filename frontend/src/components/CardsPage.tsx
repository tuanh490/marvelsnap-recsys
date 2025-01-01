import React from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface cardInfo {
  _id: string;
  name: string;
  cost: number;
  power: number;
  ability: string;
  series: string;
  art: string;
}

const CardsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<cardInfo[]>({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/card/all");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const groupedCards = (data ?? []).reduce(
    (acc: Record<string, cardInfo[]>, card: cardInfo) => {
      if (!acc[card.series]) {
        acc[card.series] = [];
      }
      acc[card.series].push(card);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6">
      {Object.keys(groupedCards).map((series) => (
        <div key={series} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{series}</h2>
          <div className="flex flex-wrap gap-4">
            {groupedCards[series].map((card: cardInfo) => (
              <Card
                key={card._id}
                cardName={card.name}
                cardImageUrl={card.art}
                cardSize="w-40"
                disableGreyOut={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsPage;
