import React from 'react';
import { useParams } from 'react-router-dom';

import { sortByCreatedAtDescending } from 'app/utils';
import FeedPost from 'app/FeedPost';
import DashboardOverview from 'app/DashboardOverview';
import usePosts from 'app/usePosts';
import useDocWithCache from 'app/useDocWithCache';

function User() {
  const { uid } = useParams();
  const user = useDocWithCache(`users/${uid}`);
  return user ? (
    <div>
      <DashboardOverview user={user} />
      <UserFeed user={user} />
    </div>
  ) : null;
}

function UserFeed({ user }) {
  const posts = usePosts(user.uid);
  return posts ? (
    <div className="user-feed">
      {posts.sort(sortByCreatedAtDescending).map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  ) : null;
}

export default User;
