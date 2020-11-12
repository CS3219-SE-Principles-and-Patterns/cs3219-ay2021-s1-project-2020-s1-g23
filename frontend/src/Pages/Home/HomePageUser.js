import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DifficultyModal from './DifficultyModal';

import { RATING_MAP } from '../../consts';

import {
  getMatch,
  getElo,
  updateElo,
  selectMatch,
  setDifficulty,
} from '../../redux/slices/matchSlice';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HistoryPage from '../HistoryPage';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 32,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  match: {
    padding: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  matchButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    margin: '8px 64px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
}));

const HomePageUser = ({ user }) => {
  const match = useSelector(selectMatch);
  const [show, setShow] = useState(false);
  const [elo, setElo] = useState(0);
  const [rank, setRank] = useState('Rankless');

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    const userEmail = userObj.email;

    getElo(userEmail).then((data) => {
      setElo(data.elo);
      const userRank =
        RATING_MAP[Math.min(5, Math.floor((data.elo - 1000) / 10))];
      setRank(userRank);
    });
  });

  const classes = useStyles();

  const handleShow = (difficulty) => {
    setShow(true);
    dispatch(setDifficulty(difficulty));

    const userObj = JSON.parse(localStorage.getItem('user'));
    const userEmail = userObj.email;

    // MVP: Naive implementation of matching
    // If accidentally quit, return to session.

    let matchObj =
      localStorage.getItem('match') === undefined ||
      localStorage.getItem('match') === null
        ? ''
        : JSON.parse(localStorage.getItem('match'));
    if (matchObj.email) {
      setShow(false);
      history.push('/interview');
      return;
    }

    const counter = 2;
    dispatch(getMatch(userObj._id, userEmail, counter, difficulty)); // will call recursively every 5 seconds until it hits true or all counter tries

    setTimeout(() => {
      matchObj =
        localStorage.getItem('match') === undefined ||
        localStorage.getItem('match') === null
          ? ''
          : JSON.parse(localStorage.getItem('match')); // checks result after 6 seconds
      if (matchObj.email) {
        setShow(false);
        history.push('/interview');
      } else {
        setShow(false);
        alert('No match found! Please try again later!');
        dispatch(updateElo(userEmail, elo));
      }
    }, 6000);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className={classes.mainContainer}>
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        style={{ textTransform: 'capitalize' }}
      >
        Welcome {user.nickname}
      </Typography>
      <Typography gutterBottom>
        We hope you will have a fulfilling experience with PeerPrep today!
      </Typography>

      <div className={classes.actions}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ marginBottom: 24 }}
            >
              Profile Information
            </Typography>
            <div style={{ flex: 1 }}>
              <div className={classes.profileInfo}>
                <Typography
                  gutterBottom
                  variant="body1"
                  color="textSecondary"
                  component="span"
                  style={{ margin: 0, marginRight: 8 }}
                >
                  Your ELO:
                </Typography>
                <Chip label={elo} color="primary" />
              </div>
              <div className={classes.profileInfo}>
                <Typography
                  gutterBottom
                  variant="body1"
                  color="textSecondary"
                  component="span"
                  style={{ margin: 0, marginRight: 8 }}
                >
                  Your Rank:
                </Typography>
                <Chip label={rank} color="primary" />
              </div>
              <Typography
                gutterBottom
                variant="body1"
                color="textSecondary"
                component="p"
                style={{ marginBottom: 16 }}
              >
                Past PeerPreps:
              </Typography>
              <HistoryPage />
            </div>
            <div
              style={{
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Typography className={classes.encourageText}>
                You are doing well! Keep up the prep!
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ marginBottom: 24 }}
            >
              Start a Session
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ marginBottom: 16 }}
            >
              Choose a question difficulty level and we will match you with a
              Peer of similar elo as you.
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ marginBottom: 16 }}
            >
              Once the session begins, you will be able to collaborate via a
              chat interface as well as a collaborative notepad.
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ marginBottom: 16 }}
            >
              You many end the session any time and your elo will be adjusted
              based on the rating given to you by your Peer.
            </Typography>
            <Paper className={classes.match}>
              <Typography
                gutterBottom
                variant="body1"
                component="h2"
                style={{ marginBottom: 16 }}
              >
                Find me a match!
              </Typography>
              <div className={classes.matchButtons}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShow('Easy')}
                  style={{ margin: 8 }}
                >
                  Easy <br /> [Recommended Rank: Beginner]
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShow('Medium')}
                  style={{ margin: 8 }}
                >
                  Medium <br /> [Recommended Rank: Newbie]
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShow('Difficult')}
                  style={{ margin: 8 }}
                >
                  Hard <br /> [Recommended Rank: Grandmaster]
                </Button>
              </div>
            </Paper>
          </CardContent>
        </Card>
      </div>
      <DifficultyModal
        handleClose={handleClose}
        show={show}
        difficulty={match ? match.difficulty : ''}
      />
    </Container>
  );
};

export default HomePageUser;
