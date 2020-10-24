import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  // destructure props.children
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
