import { useEffect } from "react"
import { allRoutes } from "./routes/allRoutes";
import Router from "./routes/router";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";







export default function App() {
  const routes = [...allRoutes];

  return(
    <div className="w-[100dvw] h-[100dvh] overflow-scroll ">
      <Appbar />
      <Router allRoutes={routes} />
      <Footer />
    </div>
  )
}