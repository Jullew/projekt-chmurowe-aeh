import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const navbarStyle = {
  backgroundColor: "lightblue",
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light" className="p-4 font-black">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
