import React from 'react';

import { useAppState } from 'app/app-state';
import usePosts from 'app/usePosts';

import DashboardOverview from 'app/DashboardOverview';
import Calendar from 'app/Calendar';

function Dashboard() {
  const [{ user }] = useAppState();
  const posts = usePosts(user.uid);

  return (
    <div className="user-dashboard">
      <DashboardOverview user={user} />
      {posts ? <Calendar user={user} posts={posts} /> : null}
    </div>
  );
}

export default Dashboard;
