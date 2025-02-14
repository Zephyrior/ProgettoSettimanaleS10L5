import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
//import WeatherCard from "./components/WeatherCard";
import { useState } from "react";
import MyHomePage from "./components/MyHomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyCity from "./components/MyCity";

function App() {
  const [long, setLong] = useState(12.4829321);
  const [lat, setLat] = useState(41.8933203);

  const handleSearch = (newLong, newLat) => {
    setLong(newLong);
    setLat(newLat);
  };
  return (
    <>
      <BrowserRouter>
        <MyNavBar handleSearch={handleSearch} />
        <Routes>
          {/* <WeatherCard long={long} lat={lat} header="Today's Forecast" header2="Forecast for the next hours:" /> */}
          <Route path="/" element={<MyHomePage long={long} lat={lat} />} />
          <Route path="/MyCity" element={<MyCity long={9.1896346} lat={45.4641943} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
