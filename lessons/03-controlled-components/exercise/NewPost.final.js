import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

const errorClass = 'new-post-error';

const MAX_MESSAGE_LENGTH = 200;

function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState();
  const [message, setMessage] = useState('Ran around the track.');
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH;

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  return (
    <div className={'new-post' + (messageTooLong ? ` ${errorClass}` : '')}>
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

export default NewPost;
