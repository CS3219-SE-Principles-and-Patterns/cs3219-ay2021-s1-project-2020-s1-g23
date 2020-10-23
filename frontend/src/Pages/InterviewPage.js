import React from 'react';
// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import Layout from '../Templates/Layout';

function InterviewPage() {
  //   const dispatch = useDispatch();
  //   const history = useHistory();

  return (
    <Layout>
      <div className="inner-flex-top vert-center-sm">
        <div className="main-50">
          <div className="container fixed-bg-question">
            <h3 className="display-5 text-center">Question</h3>
            <p className="pt-3 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="container fixed-bg-chat">
            <h3 className="display-5 text-center">Chat (Placeholder)</h3>
            {/* Chat UI */}
          </div>
        </div>
        <div className="aside-50">
          <div className="container fixed-bg-2 text-center">
            <h3 className="display-5 mb-4">Collaborative NotePad</h3>
            <form>
              <textarea className="form-control textarea-minheight" rows="20" />
            </form>
          </div>

          <div className="div-right">
            <div className="div-right-adjust-5">
              <Button variant="primary" size="lg" className="mt-5 pp-button">
                End Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default InterviewPage;
