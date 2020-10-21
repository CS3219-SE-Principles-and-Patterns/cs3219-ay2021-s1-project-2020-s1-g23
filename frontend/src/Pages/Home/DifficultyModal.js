import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DifficultyModal = ({ handleClose, show, difficulty }) => {
  return (
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
  );
};

export default DifficultyModal;
