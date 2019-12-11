import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import { logout } from 'app/utils';

import GlobalNav from 'app/GlobalNav';
import Avatar from 'app/Avatar';

function Account({ user }) {
  console.log('user: ', user);
  return (
    <div className="section">
      <Avatar uid={user.uid} size={50} />
      {user.displayName}
      <button
        aria-label="Log out"
        title="Log out"
        className="logout icon-button link circle"
        onClick={logout}
      >
        <FiLogOut />
      </button>
    </div>
  );
}

function TopBar() {
  const [{ user }] = useAppState();
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        {user ? (
          <>
            <GlobalNav />
            <Account user={user} />
          </>
        ) : (
          'Loading user...'
        )}
      </div>
    </div>
  );
}

export default TopBar;
