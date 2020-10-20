import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Layout from '../Templates/Layout';
import { selectUser } from '../redux/slices/userSlice';

import HomePageLanding from './HomePageLanding';

// Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const HomePage = () => {
  const [difficulty, setDifficulty] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true);
    setDifficulty(value);
    // *** Api call here
    console.log(value);
  };
  const user = useSelector(selectUser);

  return (
    <Layout>
      {user ? (
        <div>
          <div className="container-fluid text-center vert-center-sm">
            <h1 className="display-4">Welcome, {user.nickname}</h1>
            <h3 className="pt-3 font-italic">
              We hope you will have a fulfilling experience with PeerPrep today!
            </h3>

            <div className="inner-flex-top vert-center-sm">
              <div className="main-50">
                <div className="container fixed-bg-2 text-center">
                  <h1 className="display-4 pb-5">ELO: xxxx</h1>
                  <h3 className="pt-3 pb-3">Your current rank is</h3>
                  <h1 className="display-5 text-blue"> Aspiring Newbie</h1>
                  <h3 className="pt-3 pb-5">
                    You are
                    <span className="text-strong"> xxxx </span>
                    points away from the next rank. Keep it up!
                  </h3>
                  <a href="/history">
                    {/* To be implemented */}
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
                  <img
                    className="small-icon"
                    src="/education.png"
                    alt="Start"
                  />
                  <h3 className="pt-3">Choose your difficulty:</h3>

                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-4 pp-button"
                    name="Easy"
                    onClick={(e) => handleShow(e.target.name)}
                  >
                    Easy
                  </Button>
                  <br />

                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-3 pp-button"
                    name="Medium"
                    onClick={(e) => handleShow(e.target.name)}
                  >
                    Medium
                  </Button>
                  <br />

                  <Button
                    variant="primary"
                    size="lg"
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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{difficulty}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <div className="loader" />
              <h5 className="mt-4">Finding match ...</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <HomePageLanding />
      )}
    </Layout>
  );
};

export default HomePage;
