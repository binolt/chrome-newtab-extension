import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";
import { useTodoAuth } from "../../../context/todo-context";
import TaskTransitionContainer from "./task-transition-wrapper";


//FUNCTIONS
import useOnClickOutside from "../../../functions/click-outside"
import useKeyPress from "../../../functions/key-press"

//ICONS
import { ReactComponent as MenuIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as EditIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as TrashIcon } from "../../../icons/menu-black-24dp.svg";
import { ReactComponent as CopyIcon } from "../../../icons/menu-black-24dp.svg";

function Task({task, index, column}) {
  //global todo state
  const {updateTask, deleteTask} = useTodoAuth();

  //local state
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(task.isNew);
  const [currentValue, setCurrentValue] = useState(task.content);

  //refs / functions
  const enterPress = useKeyPress("Enter");
  const menuRef = useRef();
  const textareaRef = useRef();
  useOnClickOutside(menuRef, () => setMenuOpen(false));
  useOnClickOutside(textareaRef, () => handleUpdate());


  useEffect(() => {
    //focus textarea
    isEditing && textareaRef.current.focus();
  }, [isEditing]);


  const handleUpdate = () => {
    if(isEditing) {
      setIsEditing(false);
      const updatedTask = {
        ...task,
        updatedContent: currentValue,
      };
      updateTask(updatedTask);
    }
  };

  const handleTextareaChange = (evt) => {
    enterPress && handleUpdate();
    setCurrentValue(evt.target.value);
  };

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleDelete = () => {
    deleteTask(column, task.id, index);
  };

  const handleEdit = () => {
    console.log("editing")
    setIsEditing(true)
  }

  const TaskMenu = () => {
    return (
      <div ref={menuRef}>
        <span onClick={handleEdit}>
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
      draggableId={task.id}
      index={index}
      isDragDisabled={menuOpen || task.isNew}
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
              value={currentValue}
            />
          ) : (
            <p>{task.content}</p>
          )}


          {/* MENU */}
          <div className="task-menu-icon">
            <MenuIcon onClick={handleMenu} className="task-menu-icon" />
          </div>
          
          <TaskTransitionContainer timeout={350} open={menuOpen} classNames="task-menu-primary">
            <TaskMenu/>
          </TaskTransitionContainer>

        </div>
      )}
    </Draggable>
  );
};

export default Task;
