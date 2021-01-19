import React, { useEffect, useState } from "react";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import boardService from "../../services/BoardService";
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
  display: flex;
`;

const TodoList = (props) => {
  const [columnData, setColumnData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBoard = async () => {
      //if user
      if (currentUser) {
        //get id from pathname
        let bid = props.history.location.pathname;
        bid = bid.replace("/boards/", "");

        //fetch board from localStorage
        const localData = JSON.parse(localStorage.getItem(`board/${bid}`));
        if (localData) {
          setColumnData(localData);
          setIsLoaded(true);
          return;
        }

        //fetch board from db
        const data = await boardService.fetchBoard(currentUser.uid, bid);
        if (!data.message.msgError) {
          localStorage.setItem(`board/${bid}`, JSON.stringify(data.board));
          setColumnData(data.board);
          setIsLoaded(true);
        } else {
          props.history.push("/");
        }

        //if no user
      } else {
        props.history.push("/");
      }
    };
    fetchBoard();
  }, [currentUser, props.history]);

  const syncData = (updatedBoard) => {
    setColumnData(updatedBoard);
    localStorage.setItem(
      `board/${updatedBoard.bid}`,
      JSON.stringify(updatedBoard)
    );
    boardService.updateBoard(updatedBoard, updatedBoard.bid);
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
    const { destination, source, draggableId, type } = result;

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

    if (type === "column") {
      const newColumnOrder = Array.from(columnData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const updatedBoard = {
        ...columnData,
        columnOrder: newColumnOrder,
      };

      syncData(updatedBoard);

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

    //Moving from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const updatedColumns = {
      ...columnData.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    const updatedBoard = {
      ...columnData,
      columns: updatedColumns,
    };

    syncData(updatedBoard);
  };
  return (
    isLoaded && (
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

export default TodoList;
