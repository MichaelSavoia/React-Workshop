import React from 'react';

import useDocWithCache from 'app/useDocWithCache';

function FeedPost({ post }) {
  const user = useDocWithCache(`users/${post.uid}`);

  return user ? <div className="feed-post"></div> : null;
}

export default FeedPost;
