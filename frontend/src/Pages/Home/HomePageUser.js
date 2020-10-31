import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DifficultyModal from './DifficultyModal';

import { getMatch, getElo } from '../../redux/slices/matchSlice';

const HomePageUser = ({ user }) => {
  const [difficulty, setDifficulty] = useState('');
  const [show, setShow] = useState(false);
  const [elo, setElo] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    const userEmail = userObj.email;

    getElo(userEmail).then((data) => {
      console.log(data);
      setElo(data.elo);
    });
  });

  const handleShow = (value) => {
    setShow(true);
    setDifficulty(value);

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
      console.log('Matched');
      console.log(matchObj.email);
      history.push('/interview');
      return;
    }

    const counter = 2;
    dispatch(getMatch(userEmail, counter)); // will call recursively every 5 seconds until it hits true or all counter tries

    setTimeout(() => {
      matchObj =
        localStorage.getItem('match') === undefined ||
        localStorage.getItem('match') === null
          ? ''
          : JSON.parse(localStorage.getItem('match')); // checks result after 6 seconds
      if (matchObj.email) {
        console.log('Existing Match detected. Partner:');
        console.log(matchObj.email);
        setShow(false);
        history.push('/interview');
      } else {
        setShow(false);
      }
    }, 6000);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <div className="container-fluid text-center pad-tb-75">
        <h1 className="display-4">Welcome, {user.nickname}</h1>
        <h3 className="pt-3 font-italic">
          We hope you will have a fulfilling experience with PeerPrep today!
        </h3>

        <div className="inner-flex-top pad-tb-75">
          <div className="flex-50">
            <div className="container fixed-bg-home pp-box-deco text-center">
              <h1 className="display-4 pb-5">ELO: {elo}</h1>{' '}
              {/* TODO: Get real ELO here */}
              <h3 className="pt-3 pb-3">Your current rank is</h3>
              <h1 className="display-5 text-blue"> Aspiring Newbie</h1>{' '}
              {/* TODO: Define constants to map ELO to rank */}
              <h3 className="pt-3 pb-5 margin-lr">
                You are
                <span className="text-strong"> xxxx </span>
                points away from the next rank. Keep it up!
              </h3>
              <a href="/history">
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-5 pp-button-long"
                >
                  View History
                </Button>
              </a>
            </div>
          </div>
          <div className="flex-50">
            <div className="container fixed-bg-home pp-box-deco text-center">
              {/* <h1 className="display-4 pb-5">PeerPrep</h1> */}
              <img className="small-icon" src="/education.png" alt="Start" />
              <h3 className="pt-3">Choose your difficulty:</h3>

              <Button
                variant="primary"
                className="mt-4 pp-button"
                name="Easy"
                onClick={(e) => handleShow(e.target.name)}
              >
                Easy
              </Button>
              <br />

              <Button
                variant="primary"
                className="mt-3 pp-button"
                name="Medium"
                onClick={(e) => handleShow(e.target.name)}
              >
                Medium
              </Button>
              <br />

              <Button
                variant="primary"
                className="mt-3 pp-button"
                name="Hard"
                onClick={(e) => handleShow(e.target.name)}
              >
                Hard
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DifficultyModal
        handleClose={handleClose}
        show={show}
        difficulty={difficulty}
      />{' '}
      {/* Should I abstract here? */}
    </div>
  );
};

export default HomePageUser;
