import React, { useRef } from 'react';
import {CSSTransition} from "react-transition-group";

const TaskTransitionContainer = ({ children, ...props }) => {
  const nodeRef = useRef(null);
  const {open, classNames, timeout} = props;
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={timeout}
      classNames={classNames}
      in={open}
      unmountOnExit
      {...props}
    >
      <div ref={nodeRef} className="task-menu-container">
        {children}
      </div>
    </CSSTransition>
  );
};

export default TaskTransitionContainer;