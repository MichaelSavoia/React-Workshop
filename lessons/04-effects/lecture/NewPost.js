import React, { useState, useRef, useEffect } from 'react';
import { FiZap } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

const errorClass = 'new-post-error';
const MAX_MESSAGE_LENGTH = 200;

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState();
  const [message, setMessage] = useState('Ran around the lake.');
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH;

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div className={'new-post' + (messageTooLong ? ` ${errorClass}` : '')}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="new-post-form">
        <textarea
          className="new-post-input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="new-post-char-count">
          <span>{message.length}</span>/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown
          uid={auth.uid}
          onSelect={message => {
            setMessage(message);
          }}
        />
        <div className="new-post-buttons">
          <Minutes date={date} />
          <div>
            <button type="submit" className="icon-button cta">
              <FiZap /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
