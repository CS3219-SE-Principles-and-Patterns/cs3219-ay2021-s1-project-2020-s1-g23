import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser, signoutUser } from '../redux/slices/userSlice';

const Header = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  function signOutAndPush() {
    dispatch(signoutUser());
    history.push('/');
  }

  return (
    <Navbar bg="primary" variant="dark" style={{ height: 64 }}>
      <Nav className="mr-auto">
        <Nav.Link className="nav-font-size" href="/">
          PeerPrep
        </Nav.Link>
      </Nav>
      {user ? (
        <Button variant="contained" onClick={() => signOutAndPush()}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
      )}
    </Navbar>
  );
};

export default Header;
