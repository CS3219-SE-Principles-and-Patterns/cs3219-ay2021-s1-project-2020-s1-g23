import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  // destructure props.children
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
