import React, { useState, useEffect, useRef } from 'react';
import { FiZap } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import { formatDate, DATE_FORMAT } from 'app/utils';

import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

import NewPostFinal from './NewPost.final';
export default NewPostFinal;

const MAX_MESSAGE_LENGTH = 200;

function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState();
  const [message, setMessage] = useState('Ran around the track');

  const messageTooLong = message.length > MAX_MESSAGE_LENGTH;

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div className={'new-post' + (messageTooLong ? ' new-post-error' : '')}>
      {showAvatar && <Avatar uid={auth.uid} size={70} bg="#ebf4ff" />}
      <form className="new-post-form">
        <textarea
          className="new-post-input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="new-post-char-count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={setMessage} />
        <div className="new-post-buttons">
          <Minutes date={date} />
          <div>
            <button
              type="submit"
              disabled={messageTooLong}
              className="icon-button cta"
            >
              <FiZap /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function makeNewPostKey(date) {
  return `newPost:${formatDate(date, DATE_FORMAT)}`;
}

function getLocalStorageValue(key) {
  const val = localStorage.getItem(key);
  if (!val) return null;
  try {
    return JSON.parse(val);
  } catch (e) {
    return null;
  }
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// export default NewPost;
