import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";

interface cardInfo {
  _id: string;
  name: string;
  cost: number;
  power: number;
  ability: string;
  series: string;
  art: string;
}

interface Collection {
  _id: string;
  cards: cardInfo[];
}

interface Deck {
  _id: string;
  name: string;
  description: string;
  cards: cardInfo[];
}

const DeckPage: React.FC = () => {
  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionLoading,
  } = useQuery<Collection>({
    queryKey: ["collection"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/collection", {
        withCredentials: true,
      });

      return res.data[0];
    },
  });

  const {
    data: decks,
    error: decksError,
    isLoading: decksLoading,
    refetch,
  } = useQuery<Deck[]>({
    queryKey: ["decks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/deck", {
        withCredentials: true,
      });

      return res.data;
    },
  });

  if (decksLoading || collectionLoading) {
    return <div>Loading...</div>;
  }

  if (collectionError instanceof Error || decksError instanceof Error) {
    return <div>Error: {collectionError?.message}</div>;
  }

  if (!collectionData) {
    return <div>No collection data available</div>;
  }

  if (!decks) {
    return <div>No deck data available</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deck/${id}`, {
        withCredentials: true,
      });

      console.log(response);
      refetch();
    } catch (error) {
      console.error("Error deleting deck", error);
    }
  };

  const handleSaveDeck = async (
    name: string,
    description: string,
    cards: cardInfo[]
  ) => {
    try {
      const cardIds = cards.map((card) => card._id);

      console.log({
        name,
        description,
        cards: cardIds,
      });

      const response = await axios.post(
        "http://localhost:3000/deck",
        {
          name,
          description,
          cards: cardIds,
        },
        { withCredentials: true }
      );

      console.log(response);
      refetch();
    } catch (error) {
      console.error("Error saving deck", error);
    }
  };

  return (
    <div className="p-6">
      <Box className="mb-8 flex flex-col justify-center items-center">
        <Typography
          variant="h4"
          className="font-orbitron my-8 bg-gradient-to-r from-violet-600 via-indigo-700 to-blue-800 inline-block text-transparent bg-clip-text"
        >
          Your Decks
        </Typography>
        {decks.length == 0 ? (
          <Typography variant="h6" className="font-orbitron mt-8">
            It seems you haven't created any deck yet
          </Typography>
        ) : (
          decks.map((deck) => (
            <Box
              key={deck._id}
              className="w-fit mb-4 flex flex-col justify-center items-center"
            >
              <Deck
                cards={deck.cards}
                deckTitle={deck.name}
                deckDescription={deck.description}
                cardSize="w-32"
              />
              <Button
                variant="contained"
                color="secondary"
                type="button"
                className="text-white text-md w-full font-orbitron bg-rose-950 border-2 mb-2 font-orbitron inline-block"
                onClick={() => handleDelete(deck._id)}
              >
                Delete Deck
              </Button>
            </Box>
          ))
        )}
      </Box>
      <CreateDeck handleSaveDeck={handleSaveDeck} collection={collectionData} />
    </div>
  );
};

export default DeckPage;
