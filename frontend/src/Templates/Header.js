import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signoutUser } from '../redux/slices/userSlice';

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link className="nav-font-size" href="/">
          PeerPrep
        </Nav.Link>
      </Nav>
      {user ? (
        <Button variant="outline-light" onClick={() => dispatch(signoutUser())}>
          Logout
        </Button>
      ) : (
        <Button variant="outline-light" href="/login">
          Login
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
