import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Deck from "./Deck";

interface cardInfo {
  _id: string;
  name: string;
  cost: number;
  power: number;
  ability: string;
  series: string;
  art: string;
}

interface Deck {
  name: string;
  description: string;
  cards: cardInfo[];
}

interface Collection {
  _id: string;
  cards: cardInfo[];
}

interface CreateDeckProps {
  collection: Collection;
  handleSaveDeck: (
    title: string,
    description: string,
    cards: cardInfo[]
  ) => void;
}

const CreateDeck: React.FC<CreateDeckProps> = ({
  collection,
  handleSaveDeck,
}) => {
  const [nDecks, setNDecks] = useState<number>(1);
  const [cards, setCards] = useState<string[]>([""]);
  const [deckTitle, setDeckTitle] = useState<string>("");
  const [deckDescription, setDeckDescription] = useState<string>("");
  const [recommendations, setRecommendations] = useState<cardInfo[][]>([]);

  const { mutateAsync: predict } = useMutation({
    mutationFn: async (data: {
      cards: string[];
      n_decks: number;
      collection: string;
    }) => {
      const res = await axios.post("http://localhost:3000/predict", data);
      return res.data;
    },
    onSuccess: (data) => {
      setRecommendations(data);
    },
  });

  const handleNDecksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNDecks(value === "" ? 0 : parseInt(value, 10));
  };

  const handleCardChange = (index: number, value: string) => {
    const updatedCards = [...cards];
    updatedCards[index] = value;
    setCards(updatedCards);
  };

  const addCardField = () => {
    setCards([...cards, ""]);
  };

  const removeCardField = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await predict({
      cards,
      n_decks: nDecks,
      collection: collection._id,
    });
  };

  return (
    <Box className="flex flex-col justify-center items-center">
      <Box className="flex flex-col justify-center items-center mb-8">
        <Typography
          variant="h5"
          className="font-orbitron mb-8 bg-gradient-to-r from-violet-600 via-indigo-700 to-blue-800 inline-block text-transparent bg-clip-text"
        >
          Get a recommended deck
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="p-6 bg-transparent border-solid border-2 border-white rounded-md shadow-md w-full"
        >
          <Typography variant="h5" className="mb-4 font-orbitron text-white">
            Deck Form
          </Typography>

          <TextField
            label="Deck Title"
            type="text"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            className="mb-4 w-full"
            required
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />

          <TextField
            label="Deck Description"
            type="text"
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
            className="mb-4 w-full"
            required
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />

          <Typography variant="h6" className="mb-4 font-orbitron text-white">
            Number of Decks Recommended
          </Typography>

          <TextField
            label="Number of Decks"
            type="text"
            value={nDecks}
            onChange={handleNDecksChange}
            className="mb-4 w-full"
            required
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />

          <Typography variant="h6" className="mb-2 font-orbitron text-white">
            Cards
          </Typography>

          {cards.map((card, index) => (
            <Box key={index} className="flex items-center mb-2">
              <TextField
                label={`Card ${index + 1}`}
                value={card}
                onChange={(e) => handleCardChange(index, e.target.value)}
                className="flex-grow"
                required
                sx={{
                  input: {
                    color: "white",
                  },
                  label: {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <IconButton
                onClick={() => removeCardField(index)}
                className="ml-2 text-white"
                disabled={cards.length === 1}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Box className="flex mt-8">
            <Button
              onClick={addCardField}
              startIcon={<AddIcon />}
              className="font-orbitron"
            >
              Add Card
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              className="text-white text-md ml-auto font-orbitron bg-transparent border-2 mb-2 font-orbitron inline-block"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      {recommendations ? (
        recommendations.map((recommendation, index) => (
          <Box
            className="w-fit mb-4 flex flex-col justify-center items-center"
            key={index}
          >
            <Deck
              cards={recommendation}
              cardSize="w-28"
              deckTitle={deckTitle}
              deckDescription={deckDescription}
            />
            <Button
              variant="contained"
              color="secondary"
              type="button"
              className="text-white text-md w-full font-orbitron bg-gray-900 border-2 mb-2 font-orbitron inline-block"
              onClick={() =>
                handleSaveDeck(deckTitle, deckDescription, recommendation)
              }
            >
              Save this Deck
            </Button>
          </Box>
        ))
      ) : (
        <div className="">Something went wrong</div>
      )}
    </Box>
  );
};

export default CreateDeck;
