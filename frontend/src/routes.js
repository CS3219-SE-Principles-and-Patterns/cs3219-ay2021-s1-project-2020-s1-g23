import React from 'react';

import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HistoryPage from './Pages/HistoryPage';
import NotFoundPage from './Pages/NotFoundPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;