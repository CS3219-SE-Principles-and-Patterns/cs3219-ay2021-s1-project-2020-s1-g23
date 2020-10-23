import React from 'react';
import Button from 'react-bootstrap/Button';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import Layout from '../Templates/Layout';

function HistoryPage() {
  //   const dispatch = useDispatch();
  //   const history = useHistory();

  return (
    <Layout>
      <div className="container">
        <a href="/">
          <Button variant="primary" size="lg" className="mt-5 pp-button">
            Back
          </Button>
        </a>
        <div className="text-center">
          <h1 className="display-4 mt-5">History</h1>
          <h3 className="pt-3 font-italic">View your past PeerPreps here!</h3>
        </div>

        <div className="container fixed-bg-3 vert-center-sm">
          {/* Insert History */}
          <h5 className="pt-5 pb-5 text-center">
            It is so empty over here... Start PeerPrepping!
          </h5>
        </div>
      </div>
    </Layout>
  );
}

export default HistoryPage;
