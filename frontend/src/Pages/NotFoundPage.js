import React from 'react';
import Layout from '../Templates/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="text-center pt-5">
        <h1>404 - Page Not Found</h1>
        <p>
          The page you were looking for cannot be found! Please check your url.
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
