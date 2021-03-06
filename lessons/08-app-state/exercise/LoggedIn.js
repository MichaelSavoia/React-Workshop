import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from 'app/TopBar';
import Dashboard from 'app/Dashboard';
import Feed from 'app/Feed';
import User from 'app/User';

import { useAppState } from 'app/app-state';
import { fetchUser } from 'app/utils';
import UserDatePosts from 'app/UserDatePosts';

// import LoggedInFinal from './LoggedIn.final';
// export default LoggedInFinal;

function LoggedIn() {
  const user = null;

  return user ? (
    <Router>
      <TopBar />
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route
            path="/:uid/:date"
            render={({ location }) => {
              if (location.state && location.state.fromCalendar) {
                return <Dashboard />;
              } else {
                return <UserDatePosts />;
              }
            }}
          />
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/:uid" exact>
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>No user! Go fix it!</div>
  );
}

export default LoggedIn;
