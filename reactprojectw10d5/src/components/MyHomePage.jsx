import WeatherCard from "./WeatherCard";

const MyHomePage = (props) => {
  return (
    <>
      <WeatherCard long={props.long} lat={props.lat} header="Today's Forecast:" header2="Forecast for the next hours:" />
    </>
  );
};
export default MyHomePage;
