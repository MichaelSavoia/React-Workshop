import React from 'react';

import FeedPost from 'app/FeedPost';

const posts = [
  {
    uid: '1234',
    minutes: 1234,
    date: new Date(Date.now()),
    message: 'sup'
  },
  {
    uid: '1234',
    minutes: 1234,
    date: new Date(Date.now()),
    message: 'sup'
  },
  {
    uid: '1234',
    minutes: 1234,
    date: new Date(Date.now()),
    message: 'sup'
  },
  {
    uid: '1234',
    minutes: 1234,
    date: new Date(Date.now()),
    message: 'sup'
  },
  {
    uid: '1234',
    minutes: 1234,
    date: new Date(Date.now()),
    message: 'sup'
  }
];

function Feed() {
  return (
    <div className="user-feed">
      {posts.map((post, i) => (
        <FeedPost post={post} key={i} />
      ))}
    </div>
  );
}

export default Feed;
