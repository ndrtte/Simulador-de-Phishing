import { createBrowserRouter } from "react-router";

import { Welcome } from "../pages/components/Welcome";
import { Simulation } from "../pages/components/Simulation";
import { Results } from "../pages/components/Results";
import { CreateEmail } from "../pages/components/CreateEmail";
import { AboutSimulator } from "../pages/components/AboutSimulator";

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
  {
    path: "/about-simulator",
    Component: AboutSimulator,
  },
]);