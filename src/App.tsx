import { useRoutes } from "react-router-dom";
import { ROUTE_CONFIG } from "./router";

export default function App() {
  const appRoutes = useRoutes(ROUTE_CONFIG);
  return appRoutes
}

