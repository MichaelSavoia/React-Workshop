import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format as formatDate, parseISO } from 'date-fns';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import useDocWithCache from 'app/useDocWithCache';
import Avatar from 'app/Avatar';
import NewPost from 'app/NewPost';
import { deletePost } from 'app/utils';
import usePosts from 'app/usePosts';

export default function Posts({ params }) {
  // passed params as props because animations can't "retain" context
  const [{ auth }] = useAppState();
  const { uid, date } = params;
  const parsedDate = parseISO(date);
  const user = useDocWithCache(`users/${uid}`);
  const [adding, setAdding] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const addRef = useRef();

  const posts = usePosts(uid, { listen: !adding });

  const canAdd = auth.uid === uid;

  const handleAddNew = () => setAdding(true);

  const handleNewPostSuccess = post => {
    setAdding(false);
    setNewPostId(post.id);
  };

  useEffect(() => {
    if (!adding && addRef.current) {
      addRef.current.focus();
    }
  }, [adding]);

  const dayPosts = posts && posts.filter(post => post.date === date);

  return posts && user ? (
    <div className="posts">
      <Avatar uid={user.uid} size={100} bg="#ebf4ff" />
      <div className="posts-content">
        <h1 className="posts-user-name">
          <Link to={`/${user.uid}`}>{user.displayName}</Link>
        </h1>
        <h2 className="posts-date">{formatDate(parsedDate, 'MMM do, yyyy')}</h2>
        <div className="posts-posts">
          {dayPosts.length > 0 ? (
            dayPosts.map((post, index) => (
              <Post key={post.id} post={post} isNew={post.id === newPostId} />
            ))
          ) : (
            <div className="posts-empty">No posts today.</div>
          )}
        </div>
        {canAdd &&
          (adding ? (
            <div className="posts-adding">
              <NewPost
                takeFocus={adding}
                date={parsedDate}
                onSuccess={handleNewPostSuccess}
                showAvatar={false}
              />
            </div>
          ) : (
            <div className="posts-add">
              <button
                ref={addRef}
                className="posts-add-button icon-button link"
                onClick={handleAddNew}
              >
                <FiPlusCircle />{' '}
                <span>{posts.length > 0 ? 'Add another' : 'Add one'}</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  ) : null;
}

function Post({ post, isNew }) {
  const [{ auth }] = useAppState();
  const canDelete = auth.uid === post.uid;
  const handleDelete = () => deletePost(post.id);

  return (
    <div className="post">
      <div className="post-title">
        <div className="post-minutes">
          <span>{post.minutes}</span> Minutes
        </div>
        {canDelete && (
          <button
            aria-label="delete post"
            title="delete post"
            className="post-delete-button icon-button link"
            onClick={handleDelete}
          >
            <FiTrash2 />
          </button>
        )}
      </div>
      <div className="post-message">{post.message}</div>
    </div>
  );
}
