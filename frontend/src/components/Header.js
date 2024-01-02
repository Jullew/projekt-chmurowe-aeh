import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as Logo } from "../images/logo.svg";

const navbarStyle = {
  backgroundColor: "lightblue",
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light" className="p-4 font-black">
      <Container>
        <Logo alt={title} style={{ maxWidth: "16rem", maxHeight: "3rem" }} />
      </Container>
    </Navbar>
  );
};

export default Header;
