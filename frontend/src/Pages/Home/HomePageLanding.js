import React from 'react';
import Button from 'react-bootstrap/Button';

const HomePageLanding = () => {
  return (
    <div>
      <div className="container-fluid text-center pad-tb-150">
        <h1 className="display-4">PeerPrep</h1>
        <h3 className="pt-3">Acing tech interviews 2 at a time</h3>
        <a href="/signup">
          <Button variant="primary" size="lg" className="mt-5 pp-button">
            Sign Up
          </Button>
        </a>
      </div>

      <div className="container-fluid text-center bg-light-blue pad-tb-75">
        <div className="inner-flex-top">
          <div className="flex-30">
            <img className="page-icon" src="/book.png" alt="How it works" />
          </div>
          <div className="flex-30 pad-tb-150 text-white">
            <h1>How it works</h1>
            <p className="pt-1">Sign up first. Then we talk later.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageLanding;
