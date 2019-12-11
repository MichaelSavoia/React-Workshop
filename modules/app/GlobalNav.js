import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiAward } from 'react-icons/fi';

function GlobalNav() {
  const { pathname } = useLocation();

  return (
    <div className="section">
      <Link
        className={`calendar nav-link icon-link${
          pathname === '/' ? ' active' : ''
        }`}
        to="/"
      >
        <FiCalendar /> <span>Calendar</span>
      </Link>
      <Link
        className={`feed nav-link icon-link${
          pathname === '/feed' ? ' active' : ''
        }`}
        to="/feed"
      >
        <FiAward /> <span>Feed</span>
      </Link>
    </div>
  );
}

export default GlobalNav;
