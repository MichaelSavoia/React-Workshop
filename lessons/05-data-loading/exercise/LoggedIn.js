import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopBar from 'app/TopBar';
import Dashboard from 'app/Dashboard';
import Feed from 'app/Feed';
import User from 'app/User';

import { useAppState } from 'app/app-state';
import { fetchDoc, isValidDate } from 'app/utils';
import UserDatePosts from 'app/UserDatePosts';

function LoggedIn() {
  const [{ auth, user }, dispatch] = useAppState();

  useEffect(() => {
    if (!user) {
      let isCurrent = true;
      fetchDoc(`users/${auth.uid}`).then(user => {
        if (isCurrent) {
          dispatch({ type: 'LOAD_USER', user });
        }
      });
      return () => (isCurrent = false);
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
          <Route
            path="/:uid/:date"
            validate={hasValidDateParam}
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
  ) : null;
}

const hasValidDateParam = ({ params }) => {
  const [year, month, day] = params.date.split('-');
  const isValid = isValidDate(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
  return isValid;
};

export default LoggedIn;
