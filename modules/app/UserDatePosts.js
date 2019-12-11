import React from 'react';
import { useParams } from 'react-router-dom';
import Posts from 'app/Posts';

function UserDatePosts() {
  const params = useParams();
  return (
    <div className="posts-route">
      <Posts params={params} />
    </div>
  );
}

export default UserDatePosts;
