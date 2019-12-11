import React, { useRef } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { FiX } from 'react-icons/fi';
import { useTransition, animated } from 'react-spring';

animated.DialogOverlay = animated(DialogOverlay);
animated.DialogContent = animated(DialogContent);

export default function Dialog(props) {
  const rootRef = useRef(null);

  const updateRootElement = (item, state, props) => {
    if (item) {
      if (!rootRef.current) {
        rootRef.current = document.getElementById('root');
      }
      rootRef.current.style.filter = `blur(${props.blur}px)`;
    }
  };

  const transitions = useTransition(props.isOpen ? props : false, null, {
    from: {
      opacity: 0,
      y: -10,
      blur: 0
    },
    enter: {
      opacity: 1,
      y: 0,
      blur: 4
    },
    leave: {
      opacity: 0,
      y: -10,
      blur: 0
    },
    onFrame: updateRootElement
  });

  return transitions.map(
    ({ item, key, props: { opacity, y } }) =>
      item.isOpen && (
        <animated.DialogOverlay
          key={key}
          style={{ opacity }}
          onDismiss={item.onDismiss}
        >
          <animated.DialogContent
            aria-label="New post dialog"
            style={{
              transform: y.interpolate(y => `translate3d(0px, ${y}px, 0px)`)
            }}
          >
            {item.children}
            <button
              className="dialog-close icon-button link"
              onClick={item.onDismiss}
            >
              <FiX aria-label="Close new post dialog" />
            </button>
          </animated.DialogContent>
        </animated.DialogOverlay>
      )
  );
}
