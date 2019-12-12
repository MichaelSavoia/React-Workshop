import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import { FiChevronDown } from 'react-icons/fi';

import usePosts from 'app/usePosts';

// import RecentPostsDropdownFinal from './RecentPostsDropdown.final';
// export default RecentPostsDropdownFinal;

function RecentPostsDropdown({ uid, onSelect }) {
  const posts = usePosts(uid);

  if (posts && posts.length === 0) return null;

  return (
    <Menu>
      <MenuButton
        disabled={!posts}
        className="recent-posts-dropdown-button icon-button"
      >
        <span>Recent</span>
        <FiChevronDown aria-hidden />
      </MenuButton>
      <MenuList>
        {posts &&
          posts
            .filter(post => post.message.trim() !== '')
            .reverse()
            .map((post, index) => (
              <MenuItem key={index}>{post.message}</MenuItem>
            ))}
      </MenuList>
    </Menu>
  );
}

export default RecentPostsDropdown;
