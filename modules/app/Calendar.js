import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import {
  format as formatDate,
  subDays,
  addDays,
  isFirstDayOfMonth,
  isToday,
  isFuture,
  parseISO
} from 'date-fns';

import Dialog from 'app/Dialog';
import { DATE_FORMAT, calculateWeeks, calculateTotalMinutes } from 'app/utils';
import { useAppState } from 'app/app-state';
import NewPost from 'app/NewPost';
// import AnimatedText from 'app/AnimatedText';

function Calendar({ user, posts }) {
  const [{ auth }] = useAppState();

  const [newPostDate, setNewPostDate] = useState(null);
  const [dayWithNewPost, setDayWithNewPost] = useState(null);

  const today = formatDate(new Date(), DATE_FORMAT);

  const location = useLocation();
  const { replace } = useHistory();

  const startDate =
    location.state && location.state.startDate
      ? location.state.startDate
      : today;

  const showLater = startDate !== today;

  const isOwner = auth.uid === user.uid;
  const numWeeks = 5;

  const weeks = calculateWeeks(posts, startDate, numWeeks);

  const [prevStart, setPrevStart] = useState(startDate);
  const [transitionDirection, setTransitionDirection] = useState();
  if (prevStart !== startDate) {
    setTransitionDirection(startDate < prevStart ? 'earlier' : 'later');
    setPrevStart(startDate);
  }

  const transitions = useTransition(
    { weeks, startDate },
    item => item.startDate,
    {
      from: { y: -105 },
      enter: { y: 0 },
      leave: { y: 105 }
    }
  );

  const handleNav = (addOrSubDays, direction) => {
    const date = formatDate(
      addOrSubDays(parseISO(startDate), 7 * numWeeks),
      DATE_FORMAT
    );
    replace('/', { startDate: date, direction });
  };

  const handleEarlierClick = () => handleNav(subDays, 'earlier');
  const handleLaterClick = () => handleNav(addDays, 'later');

  const closeDialog = () => setNewPostDate(null);

  const handleNewPostSuccess = () => {
    setDayWithNewPost(formatDate(newPostDate, DATE_FORMAT));
    closeDialog();
  };

  if (!auth) return null;

  return (
    <>
      <Dialog isOpen={!!newPostDate} onDismiss={closeDialog}>
        <NewPost date={newPostDate} onSuccess={handleNewPostSuccess} />
      </Dialog>
      <div className="calendar">
        <Weekdays />
        <div className="calendar-animation-overflow">
          {transitions.map(({ item, props: { y }, key }, index) => {
            if (!item) return null;
            let transform = 'translate3d(0px, 0%, 0px)';
            if (transitionDirection === 'earlier') {
              transform = y.interpolate(y => `translate3d(0px, ${y}%, 0px)`);
            } else if (transitionDirection === 'later') {
              transform = y.interpolate(y => `translate3d(0px, ${-y}%, 0px)`);
            }
            return (
              <animated.div
                key={key}
                className="calendar-animation-wrapper"
                style={{ transform, zIndex: index }}
              >
                {item.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="calendar-week">
                    {week.map((day, dayIndex) => {
                      const showMonth =
                        weekIndex + dayIndex === 0 ||
                        isFirstDayOfMonth(day.date);
                      return (
                        <Day
                          key={dayIndex}
                          user={user}
                          showMonth={showMonth}
                          day={day}
                          isOwner={isOwner}
                          onNewPost={() => setNewPostDate(day.date)}
                          hasNewPost={
                            dayWithNewPost === formatDate(day.date, DATE_FORMAT)
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </animated.div>
            );
          })}
        </div>
        <CalendarNav
          showLater={showLater}
          onEarlier={handleEarlierClick}
          onLater={handleLaterClick}
        />
      </div>
    </>
  );
}

function CalendarNav({ onEarlier, onLater, showLater }) {
  return (
    <div className="calendar-nav">
      <button className="icon-button calendar-nav-earlier" onClick={onEarlier}>
        <FiChevronUp /> <span>Earlier</span>
      </button>
      {showLater && (
        <button className="icon-button calendar-nav-later" onClick={onLater}>
          <FiChevronDown /> <span>Later</span>
        </button>
      )}
    </div>
  );
}

function Weekdays() {
  return (
    <div className="weekdays">
      <div>Sunday</div>
      <div>Monday</div>
      <div>Tuesday</div>
      <div>Wednesday</div>
      <div>Thursday</div>
      <div>Friday</div>
      <div>Saturday</div>
    </div>
  );
}

function Day({ user, day, showMonth, isOwner, onNewPost }) {
  const dayIsToday = isToday(day.date);
  const dayIsFuture = isFuture(day.date);
  const totalMinutes = calculateTotalMinutes(day.posts);
  const location = useLocation();

  return (
    <div
      className={
        'day' +
        (totalMinutes ? ' day-has-minutes' : ' day-no-minutes') +
        (dayIsToday ? ' day-is-today' : '') +
        (dayIsFuture ? ' day-is-future' : '')
      }
    >
      <div className="day-date">
        {showMonth && (
          <div className="day-month">{formatDate(day.date, 'MMM')}</div>
        )}
        <div className="day-number">{formatDate(day.date, 'dd')}</div>
      </div>
      <div className="day-minutes">
        {totalMinutes ? (
          <Link
            className="day-link"
            to={{
              pathname: `/${user.uid}/${formatDate(day.date, DATE_FORMAT)}`,
              state: {
                ...location.state,
                fromCalendar: true
              }
            }}
          >
            <span className="calendar-minutes-text">{totalMinutes}</span>
          </Link>
        ) : dayIsFuture ? (
          <span className="calendar-future" />
        ) : isOwner ? (
          <button onClick={onNewPost} className="calendar-add-post-button">
            <FiPlus />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Calendar;
