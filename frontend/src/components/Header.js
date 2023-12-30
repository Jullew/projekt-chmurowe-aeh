import React from "react";
import Navbar from "react-bootstrap/Navbar";

const Header = (title) => {
  return (
    <Navbar bg="light" expand="lg" className="p-4 font-black">
      <Navbar.Brand href="/">{title}</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
