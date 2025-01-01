import React, { useState } from "react";
import Card from "./Card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
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

interface Collection {
  _id: string;
  cards: cardInfo[];
}

const seriesOrder = [
  "Starter",
  "Recruit",
  "Series0",
  "Series1",
  "Series2",
  "Series3",
  "Series4",
  "Series5",
];

const CardsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [nameFilter, setNameFilter] = useState<string>("");
  const [seriesFilter, setSeriesFilter] = useState<string>("");
  const [abilityFilter, setAbilityFilter] = useState<string>("");

  const { data, error, isLoading } = useQuery<cardInfo[]>({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/card/all");
      return res.data;
    },
  });

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

  const mutation = useMutation({
    mutationFn: async (cardId: string) => {
      if (!collectionData) {
        throw new Error("Collection data is not available");
      }

      const collectionId = collectionData._id;

      const res = await axios.post(
        `http://localhost:3000/collection/${collectionId}`,
        { cardId },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
    onError: (error) => {
      console.error("Failed to toggle card in collection:", error);
    },
  });

  if (isLoading || collectionLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error || collectionError instanceof Error) {
    return <div>Error: {error?.message ?? collectionError?.message}</div>;
  }

  if (!collectionData) {
    return <div>No collection data available</div>;
  }

  const collectionCardIds = (collectionData.cards ?? []).map(
    (card) => card._id
  );

  const filteredCards = (data ?? []).filter((card) => {
    const matchesName = card.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesSeries = card.series
      .toLowerCase()
      .includes(seriesFilter.toLowerCase());
    const matchesAbility = abilityFilter
      ? card.ability.toLowerCase().includes(abilityFilter.toLowerCase())
      : true;

    return matchesName && matchesSeries && matchesAbility;
  });

  const groupedCards = filteredCards.reduce(
    (acc: Record<string, cardInfo[]>, card: cardInfo) => {
      if (!acc[card.series]) {
        acc[card.series] = [];
      }
      acc[card.series].push(card);
      return acc;
    },
    {}
  );

  const sortedSeries = Object.keys(groupedCards).sort(
    (a, b) => seriesOrder.indexOf(a) - seriesOrder.indexOf(b)
  );

  const handleCardClick = (cardId: string) => {
    mutation.mutate(cardId);
  };

  const splitCardName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <div className="p-6">
      <Typography
        variant="h4"
        className="mb-8 font-orbitron text-center text-regular bg-gradient-to-r from-violet-600 via-indigo-700 to-red-400 inline-block text-transparent bg-clip-text mt-8 w-full"
      >
        Manage your Collection
      </Typography>
      <Box className="mb-6 flex space-x-4 bg-transparent">
        <TextField
          label="Filter by Name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          fullWidth
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
          label="Filter by Series"
          variant="outlined"
          value={seriesFilter}
          onChange={(e) => setSeriesFilter(e.target.value)}
          fullWidth
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
        <FormControl fullWidth className="border-white">
          <InputLabel className="text-white">Filter by Ability</InputLabel>
          <Select
            value={abilityFilter}
            label="Filter by Ability"
            onChange={(e) => setAbilityFilter(e.target.value)}
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiInputBase-root": {
                color: "white",
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
          >
            <MenuItem value="">Choose One</MenuItem>
            <MenuItem value="Discard">Discard</MenuItem>
            <MenuItem value="Destroy">Destroy</MenuItem>
            <MenuItem value="On Reveal">On Reveal</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Unspent Energy">Unspent Energy</MenuItem>
            <MenuItem value="Move">Move</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {sortedSeries.map((series) => (
        <div key={series} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{series}</h2>
          <div className="flex flex-wrap gap-4">
            {groupedCards[series].map((card: cardInfo) => {
              const isGreyedOut = !collectionCardIds.includes(card._id);
              return (
                <div key={card._id} onClick={() => handleCardClick(card._id)}>
                  <Card
                    name={splitCardName(card.name)}
                    art={card.art}
                    ability={card.ability}
                    series={card.series}
                    size="w-40"
                    disableGreyOut={false}
                    isGreyedOut={isGreyedOut}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsPage;
