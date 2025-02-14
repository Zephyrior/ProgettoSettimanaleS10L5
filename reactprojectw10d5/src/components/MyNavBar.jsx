import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const MyNavBar = (props) => {
  const [citySearch, SetCitySearch] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    SetCitySearch("");
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
            My Weather App
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <NavLink className={"nav-link"} to={"/"}>
                Home
              </NavLink>
              <NavLink className={"nav-link"} to={"/mycity"}>
                My City
              </NavLink>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search a city"
                className="me-2"
                aria-label="Search"
                id="searchBar"
                value={citySearch}
                onChange={(e) => SetCitySearch(e.target.value)}
                required
              />
              <Button
                variant="outline-info"
                onClick={() => {
                  FetchCityWeather(citySearch);
                  clearForm();
                  navigate("/");
                }}
              >
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
