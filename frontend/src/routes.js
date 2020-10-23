import React from 'react';

import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HistoryPage from './Pages/HistoryPage';
import InterviewPage from './Pages/Interview/InterviewPage';
import NotFoundPage from './Pages/NotFoundPage';
import NotAuthorisedPage from './Pages/NotAuthorisedPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/interview" component={InterviewPage} />
      <Route path="/notauthorised" component={NotAuthorisedPage} />
      <Route path="/*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
