import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';

import TopBar from 'app/TopBar';
import Dashboard from 'app/Dashboard';
import Feed from 'app/Feed';
import User from 'app/User';

import { useAppState } from 'app/app-state';
import { fetchDoc, isValidDate } from 'app/utils';
import UserDatePosts from 'app/UserDatePosts';

const hasValidDateParam = ({ params }) => {
  const [year, month, day] = params.date.split('-');
  const isValid = isValidDate(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
  return isValid;
};

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
        <Routes />
      </div>
    </Router>
  ) : null;
}

const Routes = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.replace(location.pathname, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default LoggedIn;
