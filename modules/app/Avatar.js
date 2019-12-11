import React from 'react';

import ProgressCircle from 'app/ProgressCircle';

import useDocWithCache from 'app/useDocWithCache';
import { calculateTotalMinutes, calculateExpectedMinutes } from 'app/utils';
import usePosts from 'app/usePosts';

function Avatar({ uid, size, bg }) {
  const user = useDocWithCache(`users/${uid}`);
  const posts = usePosts(uid);

  if (!user || !posts) {
    return null;
  }

  const { goal, photoURL } = user;

  console.log('posts: ', posts);

  const minutes = calculateTotalMinutes(posts);
  const expectedMinutes = calculateExpectedMinutes(user);

  const stroke = size / 10;

  const progress = (minutes / goal) * 100;
  const expectedProgress = (expectedMinutes / goal) * 100;

  console.log('progress: ', progress);
  console.log('expectedProgress: ', expectedProgress);

  return (
    <div className="avatar" style={{ height: size }}>
      <div
        role="img"
        className="avatar-image"
        style={{
          backgroundImage: `url(${photoURL})`,
          width: size - stroke * 2 + 1,
          height: size - stroke * 2 + 1,
          top: stroke,
          left: stroke
        }}
      />
      <ProgressCircle
        radius={size / 2}
        stroke={stroke}
        progress={progress}
        expectedProgress={expectedProgress}
        bg={bg}
      />
    </div>
  );
}

export default Avatar;
