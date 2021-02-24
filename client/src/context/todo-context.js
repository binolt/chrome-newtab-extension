import React, { useContext, useEffect, useState } from "react";

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

const AuthContext = React.createContext();

export function useTodoAuth() {
    return useContext(AuthContext);
}

export function TodoProvider({children}) {
    const [columnData, setColumnData] = useState(defaultColumnData);

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


    useEffect(() => {
        fetchBoard()
    }, [])
    
    const value = {
        columnData,
        setColumnData,
        syncData,
        createNewTask,
        updateTask,
        deleteTask
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
