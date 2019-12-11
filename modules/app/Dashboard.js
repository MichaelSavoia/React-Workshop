import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import { useAppState } from 'app/app-state';
import usePosts from 'app/usePosts';
import Dialog from 'app/Dialog';
import Posts from 'app/Posts';

import DashboardOverview from 'app/DashboardOverview';
import Calendar from 'app/Calendar';

function Dashboard() {
  const [{ user }] = useAppState();
  const posts = usePosts(user.uid);

  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const showDayInModal = location.state && location.state.fromCalendar;

  return (
    <>
      <Dialog
        isOpen={showDayInModal}
        className="user-posts-dialog"
        onDismiss={() => history.goBack()}
      >
        <Posts params={params} />
      </Dialog>
      <div className="user-dashboard">
        <DashboardOverview user={user} />
        {posts ? <Calendar user={user} posts={posts} /> : null}
      </div>
    </>
  );
}

export default Dashboard;
