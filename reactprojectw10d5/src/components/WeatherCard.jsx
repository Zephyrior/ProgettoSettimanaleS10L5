import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { CloudDrizzle, CloudFog2, CloudLightningRain, CloudRain, Clouds, CloudSnow, Sun } from "react-bootstrap-icons";

const WeatherCard = (props) => {
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState([]);
  const [weather, setWeather] = useState([]);
  const [cityForecast, setCityForecast] = useState([]);
  const [cityForecast5days, setCityForecast5days] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleIcon = (icon) => {
    if (!icon) return null;
    const iconSens = icon.toLowerCase();
    if (iconSens.includes("clouds")) return <Clouds />;
    if (iconSens.includes("rain")) return <CloudRain />;
    if (iconSens.includes("mist")) return <CloudDrizzle />;
    if (iconSens.includes("clear")) return <Sun />;
    if (iconSens.includes("storm")) return <CloudLightningRain />;
    if (iconSens.includes("snow")) return <CloudSnow />;
    if (iconSens.includes("fog")) return <CloudFog2 />;
    return null;
  };

  // console.log(weather);

  const convTemp = (Kelvin) => {
    const temp = parseFloat(Kelvin);
    return (temp - 273.15).toFixed();
  };
  const fetchCity = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.long}&appid=0699717248c28b0564c5305bc7788a42`);
      if (resp.ok) {
        const city = await resp.json();
        console.log(city);
        setIsLoading(false);
        setCity(city);
        setTemp(city.main);
        setCountry(city.sys);
        setWeather(city.weather[0]);
        props.fetchMyCity(city.name);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCityForeCast = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.long}&appid=0699717248c28b0564c5305bc7788a42`);
      if (resp.ok) {
        const cityForecast = await resp.json();
        console.log(cityForecast.list.slice(0, 5));
        console.log(cityForecast.list.filter((cityForecast) => cityForecast.dt_txt.includes("00:00:00")));
        setCityForecast5days(cityForecast.list.filter((cityForecast) => cityForecast.dt_txt.includes("00:00:00")));

        setCityForecast(cityForecast.list.slice(0, 5));
        setIsLoading(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCity();
    fetchCityForeCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lat, props.long]);
  return (
    <>
      <Row className="text-center d-flex justify-content-center mt-5">
        <h2>{props.header}</h2>
        <Col xs={5} className="border rounded-5 px-2 py-4" style={{ backgroundColor: "paleturquoise", opacity: "0.7" }}>
          <Row className="d-flex align-items-center">
            <Col md={8}>
              {isLoading ? (
                <Spinner animation="border" role="status" variant="primary" className="d-block mx-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div>
                  <h5>Today, {new Date().toLocaleDateString()}</h5>
                  <h1>{convTemp(temp.temp)} °C</h1>
                  <p>
                    {city.name}, {country.country}
                  </p>
                </div>
              )}
            </Col>
            <Col md={4}>
              {isLoading ? (
                <Spinner animation="border" role="status" variant="primary" className="d-block mx-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <>
                  <p className="m-0" style={{ fontSize: "5rem" }}>
                    {handleIcon(weather.main)}
                  </p>
                  <p>{weather.description}</p>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="text-center d-flex justify-content-center mt-5">
        <h2>{props.header2}</h2>
        <Col xs={5} className="border rounded-5 px-2 py-4" style={{ backgroundColor: "paleturquoise", opacity: "0.7" }}>
          <Row xs={1} md={5}>
            {cityForecast.map((city, index) => (
              <Col key={index}>
                {isLoading ? (
                  <Spinner animation="border" role="status" variant="primary" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    <h5 className="pb-1" style={{ textDecoration: "underline" }}>
                      H {city.dt_txt.split(" ")[1].split(":")[0]}
                    </h5>
                    <h4>{convTemp(city.main.temp)} °C</h4>
                    <p className="mb-0">{city.weather[0].description}</p>
                    <p style={{ fontSize: "3rem" }}>{handleIcon(city.weather[0].main)}</p>
                  </>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="text-center d-flex justify-content-center mt-5">
        <h2>{props.header3}</h2>
        <Col xs={5} className="border rounded-5 px-2 py-4" style={{ backgroundColor: "paleturquoise", opacity: "0.7" }}>
          <Row xs={1} md={5}>
            {cityForecast5days.map((city, index) => (
              <Col key={index}>
                {isLoading ? (
                  <Spinner animation="border" role="status" variant="primary" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    <h5 className="pb-1">{city.dt_txt.slice(5, 10).replace("-", "/")}</h5>
                    <h4>{convTemp(city.main.temp)} °C</h4>
                    <p className="mb-0">{city.weather[0].description}</p>
                    <p style={{ fontSize: "3rem" }}>{handleIcon(city.weather[0].main)}</p>
                  </>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default WeatherCard;
