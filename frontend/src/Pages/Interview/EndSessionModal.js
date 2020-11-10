import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  endMatch,
  updateElo,
  getElo,
  selectMatch,
} from '../../redux/slices/matchSlice';
import { API_HOST } from '../../consts';
import { selectUser } from '../../redux/slices/userSlice';

// Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const EndSessionModal = ({ handleClose, show, buddyEndedMsg }) => {
  const user = useSelector(selectUser);
  const match = useSelector(selectMatch);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (value) => {
    // value is rating assigned

    const peerEmail = JSON.parse(localStorage.getItem('match')).email;
    const userEmail = JSON.parse(localStorage.getItem('user')).email;

    // *** Api call here to give rating

    getElo(peerEmail).then((peerData) => {
      const updatedValue = peerData.elo + parseInt(value, 10);
      dispatch(updateElo(peerEmail, updatedValue));
    });

    getElo(userEmail).then((userData) => {
      const updatedValue = userData.elo + 10;
      dispatch(updateElo(userEmail, updatedValue));
    });

    fetch(`${API_HOST}/user/profile/interview/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ interview_id: match.interview_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          history.push('/');
          dispatch(endMatch());
        } else {
          alert('Failed to end session. Please try again!');
        }
      });
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Rate your buddy!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5 className="mt-4 mb-4">{buddyEndedMsg}</h5>
        <input
          type="image"
          className="xs-icon mt-4"
          src="/one.png"
          alt="1"
          onClick={(e) => handleClick(e.target.alt)}
        />
        <input
          type="image"
          className="xs-icon mt-4"
          src="/two.png"
          alt="2"
          onClick={(e) => handleClick(e.target.alt)}
        />
        <input
          type="image"
          className="xs-icon mt-4"
          src="/three.png"
          alt="3"
          onClick={(e) => handleClick(e.target.alt)}
        />
        <input
          type="image"
          className="xs-icon mt-4"
          src="/four.png"
          alt="4"
          onClick={(e) => handleClick(e.target.alt)}
        />
        <input
          type="image"
          className="xs-icon mt-4"
          src="/five.png"
          alt="5"
          onClick={(e) => handleClick(e.target.alt)}
        />
        <h5 className="mt-4 mb-4">
          Thanks for Peerprepping! Please rate your peer.
        </h5>
      </Modal.Body>
    </Modal>
  );
};

export default EndSessionModal;
