import React from "react";
import Task from "./task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as PlusIcon } from "../../../icons/add-black-24dp.svg"
import { v4 as uuidv4 } from "uuid";
import { useTodoAuth } from "../../../context/todo-context";

const Column = (props) => {
  const {createNewTask} = useTodoAuth();

  const handleNewTask = (props) => {
    const { tasks, column } = props;
    //add new task
    const newTask = {
      id: uuidv4(),
      content: "",
      isNew: true,
    };
  
    //update tasks with new task
    const updatedTasks = Array.from(tasks);
    updatedTasks.push(newTask);
  
    //update column taskids with new task id
    const newTaskIdsArray = Array.from(column.taskIds);
    newTaskIdsArray.push(newTask.id);
  
    const updatedColumn = {
      ...column,
      taskIds: newTaskIdsArray,
    };
  
    createNewTask(updatedColumn, newTask);
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="column-container"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="column-title-wrap">
            <h3 {...provided.dragHandleProps}>
              {props.column.title}
            </h3>
          </div>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
              className="column-tasklist"
              ref={provided.innerRef}
              // style={{
                //   backgroundColor: snapshot.isDraggingOver
                //     ? "#465874"
                //     : "#1a202a",
                // }}
                {...provided.droppableProps}
                >
                <InnerList
                  tasks={props.tasks}
                  column={props.column}
                  />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div
          className="column-tasklist-add"
          onClick={() => handleNewTask(props)}
          >
          <PlusIcon />
          <p>New</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const InnerList = React.memo((props, nextProps) => {  
  if (nextProps.tasks === props.tasks) {
    return false;
  } else {
    return props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        column={props.column}
      />
    ));
  }
});

export default Column;
