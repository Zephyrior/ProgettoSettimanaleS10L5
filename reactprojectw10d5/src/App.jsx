import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <>
      <MyNavBar />
      <WeatherCard />
    </>
  );
}

export default App;
