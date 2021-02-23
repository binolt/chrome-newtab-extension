import React from 'react';
import { useAuth } from '../../../context/menu-context';
import Toggle from "react-toggle";
import { useGlobalAuth } from '../../../context/global-context';

function TodoListMenu () {
    const {todoData, setTodoData} = useGlobalAuth();
    const {menu} = useAuth();

    const handleChange = () => {
        setTodoData({
            ...todoData,
            isToggled: !todoData.isToggled
        })
        if(todoData.isToggled) {
            syncLocalStorage(false)
            return;
        }
        syncLocalStorage(true)
    }

    const syncLocalStorage = (bool) => {
        const localData = JSON.parse(localStorage.getItem("todo-list"));
        const updatedData = {
            ...localData,
            isToggled: bool
        }
        localStorage.setItem("todo-list", JSON.stringify(updatedData));
    }

    return menu === "To-do List" && ( 
        <div>
            <p>Enable to-do list</p>
            <Toggle onChange={handleChange} checked={todoData.isToggled}/>
        </div>
     );
}
 
export default TodoListMenu;