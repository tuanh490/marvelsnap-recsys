import React from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import Deck from "./Deck";
import cards from "./cards";

const IndexPage: React.FC = () => {
  return (
    <div className="bg-transparent min-h-screen flex flex-col justify-center items-center">
      <Container maxWidth="lg" className="px-4 py-8">
        <Box className="shadow-lg rounded-lg p-6 mb-6 ">
          <Typography
            variant="h3"
            className="font-orbitron text-semibold bg-gradient-to-r from-blue-600 via-indigo-700 to-violet-900 inline-block text-transparent bg-clip-text"
            gutterBottom
          >
            Marvel Snap Deck Recommendations and Collection Management
          </Typography>
          <Typography
            variant="h5"
            className="font-orbitron text-regular bg-gradient-to-r from-violet-600 via-indigo-700 to-red-400 inline-block text-transparent bg-clip-text mt-8 w-4/5"
          >
            Welcome to the ultimate tool for managing your Marvel Snap card
            collection and optimizing your decks! This page helps you
            effortlessly manage your cards and recommend the best decks based on
            your collection.
          </Typography>
          <Box className="">
            <Typography
              variant="h5"
              className="font-orbitron text-regular bg-gradient-to-r from-violet-600 via-indigo-700 to-red-400 inline-block text-transparent bg-clip-text mt-8 w-4/5"
            >
              Get a Deck Recommendation
            </Typography>
            <Typography className="font-orbitron mt-4 mb-4">
              <strong>Deck Recommendations:</strong> Enter a card you have in
              your collection, and get deck recommendations based on synergy and
              optimal performance.
            </Typography>
            <Deck
              cards={cards}
              deckDescription="This is a terrible deck"
              deckTitle="Random deck"
              cardSize="w-32"
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              className="font-orbitron text-regular bg-gradient-to-r from-violet-600 via-indigo-700 to-red-400 inline-block text-transparent bg-clip-text mt-8 w-4/5"
            >
              Manage your own Collection
            </Typography>
            <Typography className="font-orbitron">
              <strong>Card Collection Management:</strong> Easily manage your
              cards, adding new ones and tracking your collection's growth.
            </Typography>
          </Box>
          <Box className="flex flex-col items-center">
            <Typography
              variant="h4"
              className="text-center font-orbitron text-regular mb-8 bg-gradient-to-r from-violet-600 via-indigo-700 to-red-400 inline-block text-transparent bg-clip-text mt-8 w-4/5"
            >
              Register Now
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              className="text-white text-xl bg-transparent border-2 mb-2 font-orbitron inline-block"
            >
              <Link className="text-white text-xl font-orbitron" to="/register">
                Register
              </Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default IndexPage;
