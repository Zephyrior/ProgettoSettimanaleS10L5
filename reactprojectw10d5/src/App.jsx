import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import WeatherCard from "./components/WeatherCard";
import { useState } from "react";

function App() {
  const [long, setLong] = useState(12.4829321);
  const [lat, setLat] = useState(41.8933203);

  const handleSearch = (newLong, newLat) => {
    setLong(newLong);
    setLat(newLat);
  };
  return (
    <>
      <MyNavBar handleSearch={handleSearch} />
      <WeatherCard long={long} lat={lat} />
    </>
  );
}

export default App;
