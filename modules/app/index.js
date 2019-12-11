import '@reach/tabs/styles.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';

import 'app/index.css';

// allow lessons to do their own rendering
if (App) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
