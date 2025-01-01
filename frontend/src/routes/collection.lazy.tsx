import { createLazyFileRoute } from "@tanstack/react-router";
import CardsPage from "../components/CardsPage";

export const Route = createLazyFileRoute("/collection")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CardsPage />;
}
