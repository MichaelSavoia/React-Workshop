import React, { useState } from 'react';
import { FiZap } from 'react-icons/fi';

import { useAppState } from 'app/app-state';
import Avatar from 'app/Avatar';
import Minutes from 'app/Minutes';
import RecentPostsDropdown from 'app/RecentPostsDropdown';

// import NewPostFinal from './NewPost.final';
// export default NewPostFinal;

const errorClass = 'new-post-error';

const MAX_MESSAGE_LENGTH = 200;

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState();

  return (
    <div className="new-post">
      {showAvatar && <Avatar uid={auth.uid} size={70} bg="#ebf4ff" />}
      <form className="new-post-form">
        <textarea
          className="new-post-input"
          placeholder="Tell us about your workout!"
        />
        <div className="new-post-char-count">0/{MAX_MESSAGE_LENGTH}</div>
        <RecentPostsDropdown uid={auth.uid} onSelect={message => {}} />
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
