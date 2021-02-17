import React, { useEffect, useState } from "react";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const defaultColumnData = {
  columnOrder: ["column-1"],
  title: "default column",
  columns: {
    "column-1": {id: "column-1", title: "to-do", taskIds: ["task-1"]},
  },
  tasks: {
    "task-1": {id: "task-1", content: "Welcome to your board!", isNew: false}
  },
  createdOn: new Date (),
}

const Board = () => {
  const [columnData, setColumnData] = useState(defaultColumnData);

  useEffect(() => {
    fetchBoard()
  }, [])

  const fetchBoard = () => {
    const localData = JSON.parse(localStorage.getItem("todo-list"));
    localData && setColumnData(localData.board);
  }



  const syncData = (updatedBoard) => {
    //update state
    setColumnData(updatedBoard);
    //update local storage
    const localData = JSON.parse(localStorage.getItem("todo-list"))
    const updatedData = {
      ...localData,
      board: updatedBoard
    }
    localStorage.setItem("todo-list", JSON.stringify(updatedData) );
  };

  const updateTask = (task) => {
    const updatedTask = {
      ...columnData.tasks[task.id],
      content: task.updatedContent,
      isNew: false,
    };

    const updatedTasks = {
      ...columnData.tasks,
      [task.id]: updatedTask,
    };

    const updatedBoard = {
      ...columnData,
      tasks: updatedTasks,
    };

    //delete old task
    delete columnData.tasks[task.id];

    //update new task
    syncData(updatedBoard);
  };

  const createNewTask = (updatedColumn, newTask) => {
    const updatedColumns = {
      ...columnData.columns,
      [updatedColumn.id]: updatedColumn,
    };

    const updatedTasks = {
      ...columnData.tasks,
      [newTask.id]: newTask,
    };

    const updatedBoard = {
      ...columnData,
      columns: updatedColumns,
      tasks: updatedTasks,
    };

    syncData(updatedBoard);
  };

  const deleteTask = (column, taskId, index) => {
    //remove task from column taskids array
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    //update columns
    const updatedColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const updatedColumns = {
      ...columnData.columns,
      [column.id]: updatedColumn,
    };

    //delete task from board
    delete columnData.tasks[taskId];

    const updatedBoard = {
      ...columnData,
      columns: updatedColumns,
    };

    syncData(updatedBoard);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    //if destination === source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //update task order in column
    const start = columnData.columns[source.droppableId];
    const finish = columnData.columns[destination.droppableId];

    //if task is dropped in the same column it started in
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      //update state
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const updatedColumns = {
        ...columnData.columns,
        [newColumn.id]: newColumn,
      };

      const updatedBoard = {
        ...columnData,
        columns: updatedColumns,
      };

      syncData(updatedBoard);

      return;
    }
  };

  
  return (
     (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnData.columnOrder.map((columnId, index) => {
                const column = columnData.columns[columnId];
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    taskMap={columnData.tasks}
                    index={index}
                    createNewTask={createNewTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  );
};

const InnerList = React.memo((props, nextProps) => {
  if (
    nextProps.column === props.column &&
    nextProps.taskMap === props.taskMap &&
    nextProps.index === props.index
  ) {
    return false;
  } else {
    const {
      column,
      taskMap,
      index,
      createNewTask,
      deleteTask,
      updateTask,
    } = props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
        createNewTask={createNewTask}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    );
  }
});

export default Board;
