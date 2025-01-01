import { createLazyFileRoute } from "@tanstack/react-router";
import IndexPage from "../components/IndexPage";

export const Route = createLazyFileRoute("/")({
  component: IndexPage,
});
