import React, { useState, useEffect, useRef } from 'react';
import { FiZap } from 'react-icons/fi';
import { format as formatDate } from 'date-fns';

import { useAppState } from 'app/app-state';
import { createPost, DATE_FORMAT } from 'app/utils';
import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

const MAX_MESSAGE_LENGTH = 200;

export default function NewPost({ takeFocus, date, showAvatar }) {
  const [{ auth }] = useAppState();
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const formRef = useRef();
  const minutesRef = useRef();
  const messageRef = useRef();
  const tooMuchText = message.length > MAX_MESSAGE_LENGTH;

  function handleAboutChange(event) {
    setMessage(event.target.value);
  }

  function handleRecentSelect(text) {
    setMessage(text);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaving(false);
    createPost({
      message: messageRef.current.value,
      minutes: parseInt(minutesRef.current.value, 10),
      date: formatDate(date, DATE_FORMAT),
      uid: auth.uid
    }).then(post => {
      setSaving(false);
      setMessage('');
    });
  }

  return (
    <div className={'new-post' + (tooMuchText ? ' new-post-error' : '')}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form ref={formRef} className="new-post-form" onSubmit={handleSubmit}>
        <textarea
          ref={messageRef}
          className="new-post-input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleAboutChange}
        />
        <div className="new-post-char-count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentSelect} />
        <div className="new-post-buttons">
          <Minutes date={date} ref={minutesRef} />
          <div>
            <button disabled={saving} type="submit" className="icon-button cta">
              <FiZap /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
