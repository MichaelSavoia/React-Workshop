import React, { useState, useEffect } from 'react';

import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  fetchUser,
  subscribeToPosts
} from 'app/utils';
import ProgressCircle from 'app/ProgressCircle';

export default function Avatar({ uid, size = 50, bg, className, ...rest }) {
  const user = null;
  const posts = null;

  if (!user) {
    return (
      <div
        className={'avatar empty ' + className}
        style={{ width: size, height: size }}
        {...rest}
      />
    );
  }

  const { photoURL, displayName, goal } = user;
  const stroke = size / 10;

  const circles = (() => {
    if (!posts) return null;
    const minutes = posts && calculateTotalMinutes(posts);
    const expectedMinutes = posts && calculateExpectedMinutes(user);
    const progress = (minutes / goal) * 100;
    const expectedProgress = (expectedMinutes / goal) * 100;

    return (
      <ProgressCircle
        radius={size / 2}
        stroke={stroke}
        progress={progress}
        expectedProgress={expectedProgress}
        bg={bg}
      />
    );
  })();

  return (
    <div
      className={'avatar ' + className}
      style={{ width: size, height: size }}
      {...rest}
    >
      <div
        role="img"
        aria-label={`Avatar for ${displayName}`}
        className="avatar-image"
        style={{
          backgroundImage: `url(${photoURL})`,
          width: size - stroke * 2 + 1,
          height: size - stroke * 2 + 1,
          top: stroke,
          left: stroke
        }}
      />
      {circles}
    </div>
  );
}
