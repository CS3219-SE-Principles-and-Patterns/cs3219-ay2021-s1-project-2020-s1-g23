import React from 'react';
import Layout from '../Templates/Layout';

const NotAuthorisedPage = () => {
  return (
    <Layout>
      <div className="text-center pt-5">
        <h1>User Not Authorised</h1>
        <p>Please login to view this page.</p>
      </div>
    </Layout>
  );
};

export default NotAuthorisedPage;
