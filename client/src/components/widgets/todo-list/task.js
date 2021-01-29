import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CSSTransition } from "react-transition-group";
import TextareaAutosize from "react-textarea-autosize";


//FUNCTIONS
import useOnClickOutside from "../../../functions/click-outside"
import useKeyPress from "../../../functions/key-press"

//ICONS
import { ReactComponent as MenuIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as EditIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as TrashIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as CopyIcon } from "../../../icons/menu-black-24dp.svg";

const Task = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(props.task.isNew);
  const [currentValue, setCurrentValue] = useState("");
  const enterPress = useKeyPress("Enter");
  const menuRef = useRef();
  const textareaRef = useRef();

  useEffect(() => {
    //focus textarea
    isEditing && textareaRef.current.focus();
  }, [isEditing]);

  useOnClickOutside(menuRef, () => setMenuOpen(false));
  useOnClickOutside(textareaRef, () => updateTask());

  const updateTask = () => {
    setIsEditing(false);
    const updatedTask = {
      ...props.task,
      updatedContent: currentValue,
    };
    props.updateTask(updatedTask);
  };

  const handleTextareaChange = (evt) => {
    enterPress && updateTask();
    setCurrentValue(evt.target.value);
  };

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleDelete = () => {
    const { column, task, index } = props;
    props.deleteTask(column, task.id, index);
  };

  const TaskMenu = () => {
    return (
      <div className="task-menu-container" ref={menuRef}>
        <span>
          <EditIcon />
          <p>Edit</p>
        </span>
        <span>
          <CopyIcon />
          <p>Copy</p>
        </span>
        <span onClick={handleDelete}>
          <TrashIcon />
          <p>Delete</p>
        </span>
      </div>
    );
  };

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={menuOpen || props.task.isNew}
    >
      {(provided, snapshot) => (
        <div
          className="task-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <TextareaAutosize
              onChange={handleTextareaChange}
              ref={textareaRef}
              className="task-input"
              placeholder="Start Typing..."
              wrap="hard"
            />
          ) : (
            <p>{props.task.content}</p>
          )}

          <MenuIcon onClick={handleMenu} className="task-menu-icon" />
          <CSSTransition
            in={menuOpen}
            timeout={500}
            unmountOnExit
            classNames="task-menu-primary"
          >
            <TaskMenu />
          </CSSTransition>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
