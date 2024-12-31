import { createLazyFileRoute } from "@tanstack/react-router";
import Login from "../components/Login";

export const Route = createLazyFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = (email: string, password: string) => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return <Login onSubmit={handleSubmit} />;
}
