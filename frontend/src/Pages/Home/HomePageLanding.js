import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  howitworks: {
    padding: 32,
    color: 'white',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  howContainer: {
    backgroundColor: '#0275d8',
    padding: 8,
    margin: '8px 0',
  },
  intro: {
    padding: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContainer: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}));

const HomePageLanding = () => {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      <div className={classes.intro}>
        <h1>PeerPrep</h1>
        <h3>Acing tech interviews 2 at a time</h3>
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Link>
      </div>

      <div className={classes.howContainer}>
        <div className="inner-flex-top">
          <div className="flex-30">
            <img className="page-icon" src="/book.png" alt="How it works" />
          </div>
          <div className={classes.howitworks}>
            <h1>How it works</h1>
            <p>Create an account with us!</p>
            <p>
              Once logged in, select a difficulty level and we will match you
              with peers of similar skill level.
            </p>
            <p>As you complete interviews, your assigned elo increases.</p>
            <p>We only match you with peers of similar elo.</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePageLanding;
