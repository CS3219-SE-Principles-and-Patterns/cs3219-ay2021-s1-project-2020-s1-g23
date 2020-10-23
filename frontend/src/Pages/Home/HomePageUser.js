import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import DifficultyModal from './DifficultyModal';

const HomePageUser = ({ user }) => {
  const [difficulty, setDifficulty] = useState('');
  const [show, setShow] = useState(false);

  const handleShow = (value) => {
    setShow(true);
    setDifficulty(value);
    // *** Api call here
    console.log(value);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <div className="container-fluid text-center vert-center-sm">
        <h1 className="display-4">Welcome, {user.nickname}</h1>
        <h3 className="pt-3 font-italic">
          We hope you will have a fulfilling experience with PeerPrep today!
        </h3>

        <div className="inner-flex-top vert-center-sm">
          <div className="main-50">
            <div className="container fixed-bg-2 text-center">
              <h1 className="display-4 pb-5">ELO: xxxx</h1>{' '}
              {/* TODO: Get real ELO here */}
              <h3 className="pt-3 pb-3">Your current rank is</h3>
              <h1 className="display-5 text-blue"> Aspiring Newbie</h1>{' '}
              {/* TODO: Define constants to map ELO to rank */}
              <h3 className="pt-3 pb-5">
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
          <div className="aside-50">
            <div className="container fixed-bg-2 text-center">
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
