import { useState } from "react";
import WeatherCard from "./WeatherCard";

const MyHomePage = (props) => {
  const [myCity, setMyCity] = useState("");
  const fetchMyCity = (city) => {
    setMyCity(city);
  };
  return (
    <>
      <WeatherCard
        long={props.long}
        lat={props.lat}
        header={`${myCity}'s Weather Forecast:`}
        header2="Forecast for the next hours:"
        header3={`${myCity} in the next 5 days:`}
        fetchMyCity={fetchMyCity}
      />
    </>
  );
};
export default MyHomePage;
