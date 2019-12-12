import '@reach/tabs/styles.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';

import 'app/index.css';
import 'app/App.css';
import 'app/LoggedOut.css';
import 'app/LoggedIn.css';
import 'app/About.css';
import 'app/TopBar.css';
import 'app/Feed.css';
import 'app/FeedPost.css';
import 'app/DashboardOverview.css';
import 'app/Calendar.css';
import 'app/Dialog.css';
import 'app/NewPost.css';
import 'app/Minutes.css';
import 'app/RecentPostsDropdown.css';
import 'app/Posts.css';

// allow lessons to do their own rendering
if (App) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
