import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from 'app/TopBar';
import Dashboard from 'app/Dashboard';
import Feed from 'app/Feed';

import { useAppState } from 'app/app-state';
import { fetchDoc, isValidDate } from 'app/utils';

function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState();

  useEffect(() => {
    if (!user) {
      fetchDoc(`users/${auth.uid}`).then(user => {
        dispatch({ type: 'LOAD_USER', user });
      });
    }
  }, [user, auth.uid, dispatch]);

  return user ? (
    <Router>
      <TopBar />
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : null;
}

export default LoggedIn;
