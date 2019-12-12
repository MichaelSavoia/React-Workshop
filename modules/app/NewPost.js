import React, { useState, useEffect, useRef } from 'react';
import { FiZap } from 'react-icons/fi';
import { format as formatDate } from 'date-fns';

import { useAppState } from 'app/app-state';
import { createPost, DATE_FORMAT } from 'app/utils';
import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

const MAX_MESSAGE_LENGTH = 200;

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState();
  const storageKey = makeNewPostKey(date);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(
    getLocalStorageValue(storageKey) || ''
  );
  const messageRef = useRef();
  const formRef = useRef();

  // Save the message for this date as its value changes.
  useEffect(() => {
    setLocalStorage(storageKey, message);
  }, [storageKey, message]);

  // Automatically focus the <textarea> if it should take focus.
  useEffect(() => {
    if (takeFocus) messageRef.current.focus();
  }, [takeFocus, message]);

  const messageTooLong = message.length > MAX_MESSAGE_LENGTH;

  const submit = form => {
    setIsSaving(true);
    const minutesVal = form.elements[3].value
      ? form.elements[3].value
      : form.elements[2].value;

    createPost({
      message: messageRef.current.value,
      minutes: Math.max(parseInt(minutesVal, 10) || 1, 1),
      date: formatDate(date, DATE_FORMAT),
      uid: auth.uid
    }).then(post => {
      setIsSaving(false);
      setMessage('');
      onSuccess(post);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(e.target);
  };

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  const handleRecentSelect = text => {
    setMessage(text);
  };

  return (
    <div className={'new-post' + (messageTooLong ? ' new-post-error' : '')}>
      {showAvatar && <Avatar uid={auth.uid} size={70} bg="#ebf4ff" />}
      <form ref={formRef} className="new-post-form" onSubmit={handleSubmit}>
        <textarea
          ref={messageRef}
          className="new-post-input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="new-post-char-count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentSelect} />
        <div className="new-post-buttons">
          <Minutes date={date} />
          <div>
            <button
              type="submit"
              disabled={isSaving || messageTooLong}
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
  console.log(date);
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
