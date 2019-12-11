import React from 'react';
import LoggedIn from 'app/LoggedIn';
import LoggedOut from 'app/LoggedOut';
import { AppStateProvider } from 'app/app-state';
import appReducer, { initialState } from 'app/appReducer';
import useAuth from 'app/useAuth';

import 'app/App.css';
import 'app/LoggedOut.css';
import 'app/LoggedIn.css';
import 'app/TopBar.css';
import 'app/Feed.css';
import 'app/FeedPost.css';
import 'app/DashboardOverview.css';
import 'app/Calendar.css';

function App() {
  const { authAttempted, auth } = useAuth();
  if (!authAttempted) return null;
  return <div className="layout">{auth ? <LoggedIn /> : <LoggedOut />}</div>;
}

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <App />
  </AppStateProvider>
);
