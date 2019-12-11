import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format as formatDate, formatDistanceToNow, parseISO } from 'date-fns';

import Avatar from 'app/Avatar';

import useDocWithCache from 'app/useDocWithCache';

const stopPropagation = event => event.stopPropagation();

export default function FeedPost({ post }) {
  const user = useDocWithCache(`users/${post.uid}`);
  const ariaLink = useAriaLink(`/${post.uid}/${post.date}`);

  return user ? (
    <div className="feed-post" {...ariaLink}>
      <Avatar uid={post.uid} size={100} bg="#ebf4ff" />
      <div className="feed-post-about">
        <div className="feed-post-minutes">{post.minutes} Minutes</div>
        <Link
          onClick={stopPropagation}
          className="feed-post-date"
          to={`/${post.uid}/${post.date}`}
        >
          {formatDate(parseISO(post.date), 'EEE, MMMM do')}
        </Link>
        <div className="feed-post-user-label">Created by:</div>
        <div className="feed-post-user-name">
          <Link onClick={stopPropagation} to={`/${user.uid}`}>
            {user.displayName}
          </Link>{' '}
          <span className="feed-post-created-at">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true
            })}
          </span>{' '}
        </div>
        <div className="feed-post-message">{post.message}</div>
      </div>
    </div>
  ) : null;
}

function useAriaLink(href) {
  const history = useHistory();
  const role = 'link';
  const tabIndex = '0';

  const onKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
    }
    if (event.key === 'Enter') {
      history.push(href);
    }
  };

  const onKeyUp = event => {
    event.preventDefault();
    if (event.key === ' ') {
      history.push(href);
    }
  };

  const onClick = event => {
    history.push(href);
  };

  return { role, onKeyDown, onKeyUp, tabIndex, onClick };
}
