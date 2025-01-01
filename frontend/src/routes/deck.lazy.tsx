import { createLazyFileRoute } from "@tanstack/react-router";
import DeckPage from "../components/DeckPage";

export const Route = createLazyFileRoute("/deck")({
  component: DeckPage,
});
