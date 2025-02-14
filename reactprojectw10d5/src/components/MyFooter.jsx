import { Col, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <Row className="d-flex justify-content-center text-center mt-5 py-2" style={{ backgroundColor: "white", opacity: "0.5" }}>
        <Col xs="auto">
          <p className="m-0">© 2025 • @Zephyrior</p>
        </Col>
      </Row>
    </>
  );
};
export default MyFooter;
