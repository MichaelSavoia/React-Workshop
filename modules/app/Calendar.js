import React, { Fragment, useState, useCallback } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import {
  format as formatDate,
  subDays,
  addDays,
  isFirstDayOfMonth,
  isToday,
  isFuture
} from 'date-fns';

// import AnimatedDialog from 'app/AnimatedDialog';
import { DATE_FORMAT, calculateWeeks, calculateTotalMinutes } from 'app/utils';
import { useAppState } from 'app/app-state';
// import NewPost from 'app/NewPost';
// import AnimatedText from 'app/AnimatedText';

function Calendar({ user, posts }) {
  const [{ auth }] = useAppState();

  const [newPostDate, setNewPostDate] = useState(null);
  const [dayWithNewPost, setDayWithNewPost] = useState(null);

  const today = formatDate(new Date(), DATE_FORMAT);

  const location = useLocation();
  const { push, replace } = useHistory();

  const startDate =
    location.state && location.state.startDate
      ? location.state.startDate
      : today;

  const showLater = startDate !== today;

  const isOwner = auth.uid === user.uid;
  const numWeeks = 5;

  const weeks = calculateWeeks(posts, startDate, numWeeks);

  const transitions = useTransition(
    { weeks, startDate },
    item => item.startDate,
    {
      from: { y: -105 },
      enter: { y: 0 },
      leave: { y: 105 },
      initial: null
    }
  );

  const handleNav = (addOrSubDays, direction) => {
    const date = formatDate(addOrSubDays(startDate, 7 * numWeeks), DATE_FORMAT);
    replace('/', { startDate: date, direction });
  };

  const handleEarlierClick = () => handleNav(subDays, 'earlier');
  const handleLaterClick = () => handleNav(subDays, 'earlier');

  const handleAnimationRest = useCallback(() => {
    setDayWithNewPost(null);
  }, [setDayWithNewPost]);

  if (!auth) return null;

  return (
    <div className="calendar">
      <Weekdays />
      <div className="calendar-animation-overflow">
        {transitions.map(({ item, props: { y }, key }, index) => {
          if (!item) return null;

          return (
            <animated.div
              key={key}
              className="calendar-animation-wrapper"
              style={{ zIndex: index }}
            >
              {item.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="calendar-week">
                  {week.map((day, dayIndex) => {
                    const showMonth =
                      weekIndex + dayIndex === 0 || isFirstDayOfMonth(day.date);
                    return (
                      <Day
                        key={dayIndex}
                        user={user}
                        showMonth={showMonth}
                        day={day}
                        isOwner={isOwner}
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
  );
}

function CalendarNav({ onEarlier, onLater, showLater }) {
  return (
    <div className="calendar-nav">
      <button className="icon-button calendar-earlier" onClick={onEarlier}>
        <FiChevronUp /> <span>Earlier</span>
      </button>
      {showLater && (
        <button className="icon-button calendar-later" onClick={onLater}>
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

function Day({
  user,
  day,
  showMonth,
  isOwner,
  onNewPost,
  hasNewPost,
  modalIsOpen,
  onAnimatedTextRest
}) {
  const dayIsToday = isToday(day.date);
  const dayIsFuture = isFuture(day.date);
  const totalMinutes = calculateTotalMinutes(day.posts);
  const animateMinutes = hasNewPost && !modalIsOpen;
  const { location } = useLocation();

  return (
    <div
      className={
        'day' +
        (totalMinutes ? '' : ' day-no-minutes') +
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
            href={`/${user.uid}/${formatDate(day.date, DATE_FORMAT)}`}
            state={{
              fromCalendar: true,
              ...location.state
            }}
          >
            {animateMinutes ? (
              {
                /* <AnimatedText
                children={totalMinutes}
                className="Calendar_minutes_text"
                onRest={onAnimatedTextRest}
              /> */
              }
            ) : (
              <span className="calendar-minutes-text">{totalMinutes}</span>
            )}
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
