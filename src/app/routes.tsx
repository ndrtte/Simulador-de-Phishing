import { createBrowserRouter } from "react-router";
import { Welcome } from "./components/Welcome";
import { Simulation } from "./components/Simulation";
import { Results } from "./components/Results";
import { CreateEmail } from "./components/CreateEmail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/simulation",
    Component: Simulation,
  },
  {
    path: "/results",
    Component: Results,
  },
  {
    path: "/create-email",
    Component: CreateEmail,
  },
]);