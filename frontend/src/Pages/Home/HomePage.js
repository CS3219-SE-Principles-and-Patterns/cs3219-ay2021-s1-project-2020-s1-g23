import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Templates/Layout';
import { selectUser } from '../../redux/slices/userSlice';

import HomePageLanding from './HomePageLanding';
import HomePageUser from './HomePageUser';

// Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const HomePage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>{user ? <HomePageUser user={user} /> : <HomePageLanding />}</Layout>
  );
};

export default HomePage;
