import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
const LandingPage = () => {
  // useEffect(() => {
  //  const userInfo = localStorage.getItem("userInfo");
  //  if (userInfo) {
  //    history.push("/mynotes");
  //}
  //}, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Maker</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landing button">
                  Login
                </Button>
              </a>

              <a href="/register">
                <Button
                  size="lg"
                  className="landing button"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
