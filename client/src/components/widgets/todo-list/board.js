import React from "react";
import Column from "./column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useGlobalAuth } from "../../../context/global-context";
import {useTodoAuth} from "../../../context/todo-context";

const Container = styled.div`
  display: flex;
`;

const Board = () => {
  const {todoData, loaded} = useGlobalAuth();
  const {columnData, syncData} = useTodoAuth();

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

  
  return loaded && todoData.isToggled && (
     (
      <div className="content-todo">
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
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      </div>
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
    } = props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
      />
    );
  }
});

export default Board;
