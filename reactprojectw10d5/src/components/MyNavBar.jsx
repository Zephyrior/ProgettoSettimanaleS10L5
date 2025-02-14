import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MyNavBar = (props) => {
  const [citySearch, SetCitySearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const clearForm = () => {
    SetCitySearch("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    FetchCityWeather(citySearch);
    clearForm();
    navigate("/");
  };

  const FetchCityWeather = async () => {
    try {
      const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&appid=0699717248c28b0564c5305bc7788a42`);
      if (resp.ok) {
        const city = await resp.json();
        console.log(city[0]);
        props.handleSearch(city[0].lon, city[0].lat);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary p-0">
        <Container className="p-3" fluid style={{ backgroundColor: "paleturquoise" }}>
          <NavLink className={"navbar-brand"} to={"/"}>
            <strong> My Weather App </strong>
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <NavLink className={"nav-link"} style={{ textDecoration: location.pathname === "/" ? "underline" : "none" }} to={"/"}>
                Home
              </NavLink>
              <NavLink className={"nav-link"} style={{ textDecoration: location.pathname === "/mycity" ? "underline" : "none" }} to={"/mycity"}>
                My City
              </NavLink>
            </Nav>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                style={{ borderRadius: "50px" }}
                type="text"
                placeholder="Search a city"
                className="me-2"
                aria-label="Search rounded-5"
                id="searchBar"
                value={citySearch}
                onChange={(e) => SetCitySearch(e.target.value)}
                required
              />
              <Button type="submit" variant="outline-info">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MyNavBar;
