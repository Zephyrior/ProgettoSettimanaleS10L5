import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const WeatherCard = () => {
  const [long, setLong] = useState("12.4829321");
  const [lat, setLat] = useState("41.8933203");
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState([]);
  const [weather, setWeather] = useState([]);

  console.log(weather);

  const convTemp = (Kelvin) => {
    const temp = parseFloat(Kelvin);
    return (temp - 273.15).toFixed();
  };
  const fetchCity = async () => {
    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0699717248c28b0564c5305bc7788a42`);
      if (resp.ok) {
        const city = await resp.json();
        console.log(city);
        setCity(city);
        setTemp(city.main);
        setCountry(city.sys);
        setWeather(city.weather[0]);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);
  return (
    <>
      <Row className="text-center d-flex justify-content-center">
        <Col xs={4} className="border rounded p-2" style={{ backgroundColor: "paleturquoise" }}>
          <Row>
            <Col xs={8}>
              <h5>Today, {new Date().toLocaleDateString()}</h5>
              <h2>{convTemp(temp.temp)} °C</h2>
              {city.name}, {country.country}
            </Col>
            <Col xs={4}>{weather.main}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default WeatherCard;
