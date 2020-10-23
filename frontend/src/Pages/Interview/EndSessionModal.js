import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

// Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const EndSessionModal = ({ handleClose, show }) => {
  const history = useHistory();

  const handleClick = (value) => {
    // value is rating assigned
    console.log(value);
    history.push('/');
    // *** Api call here to give rating
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate your buddy!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <input
          type="image"
          className="xs-icon mt-4"
          src="/one.png"
          alt="1"
          name="1"
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
          Note that rating your peer will automatically end the session.
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EndSessionModal;
