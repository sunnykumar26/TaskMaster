import React, { useState } from 'react';
import './App.css';

import {BsFillTrash2Fill} from 'react-icons/bs';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {BiSolidEdit} from 'react-icons/bi';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [value, setValue] = useState('');
  const [editId, setEditId] = useState(0);

  const handleChange = (event) => {
    setNewTask(event.target.value);
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask === '') return;
    if (editId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, taskName: newTask } : todo
      );
      setTodos(updatedTodos);
      setEditId(0);
    } else {
      const task = {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        taskName: newTask,
        completed: false
      };
      setTodos([...todos, task]);
    }
    setNewTask('');
    setValue('');
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (task) => {
    setValue(task.taskName);
    setEditId(task.id);
  };

  const ListTask = todos.map((task) => (
    <div className="Task-item" style={{ backgroundColor: task.completed ? 'tomato' : '' }} key={task.id}>
      <h2 className='Task-data'>{task.taskName}</h2>

      <div className='icon-div'>
      <BsFillTrash2Fill className='icons' onClick={() => handleDelete(task.id)}/>
      <BsFillCheckCircleFill className='icons' onClick={() => handleComplete(task.id)}/>
      <BiSolidEdit className='icons' onClick={() => handleEdit(task)}/>  
      </div>
      
    </div>
  ));

  return (
    <div>
      <div className="wrapper">
        <h1>Task Master 🥷🏻</h1>
        <div className="input-data">
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={handleSubmit}>Add Task</button>
        </div>

        <div className="display-data">{ListTask}</div>
      </div>
    </div>
  );
};

export default App;