import React from 'react';

import Avatar from 'app/Avatar';
import usePosts from 'app/usePosts';

import {
  calculateTotalMinutes,
  calculateExpectedMinutes,
  calculateMakeup
} from 'app/utils';

function DashboardOverview({ user }) {
  const posts = usePosts(user.uid);
  if (!posts) return null;

  const total = calculateTotalMinutes(posts);
  const expected = calculateExpectedMinutes(user);
  const deficit = expected - total;
  const makeup = calculateMakeup(total, expected, user.goal);

  return (
    <div className="dashboard-overview">
      <Avatar uid={user.uid} size={200} bg="#fff" />
      <div className="overview-info">
        <div className="info-group info-expected">
          <div className="info-header">Expected Minutes:</div>
          <div className="info-value">{expected}</div>
        </div>
        <div
          className={`info-group info-total${
            total >= expected ? ' info-goal-achieved' : ''
          }`}
        >
          <div className="info-header">Total Minutes:</div>
          <div className="info-value">{total}</div>
        </div>
        <div className="info-group info-deficit">
          <div className="info-header">Minutes Short:</div>
          <div className="info-value">{deficit > 0 ? deficit : 0}</div>
        </div>
        <div className="info-group info-makeup">
          <div className="info-header">Makeup Workouts:</div>
          <div className="info-value">{makeup > 0 ? makeup : 0}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
