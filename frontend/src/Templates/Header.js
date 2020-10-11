import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/">PeerPrep</Nav.Link>
      </Nav>
      <Button variant="outline-light" href="/login">
        Login
      </Button>
    </Navbar>
  );
};

export default Header;
