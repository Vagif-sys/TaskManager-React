import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import "./TaskManager.css";
import Task from "./Task";

const TaskManager = () => {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  //const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useLocalStorage('tasks',[]);
  const [taskID, setTaskID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if ((!name && !date) || !name || !date) {
      alert("Please enter date and name!");
    } else if (name && date && isEditing) {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskID) {
            return { ...task, name, date, complete: false };
          }

          return task;
        })
      );

      setName("");
      setDate("");
    } else {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false,
      };

      setTasks([...tasks, newTask]);
      console.log(tasks);
      setName("");
      setDate("");
    }
  };

  const editTaskHandler = (id) => {
    const ThisTask = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setTaskID(id);
    setName(ThisTask.name);
    setDate(ThisTask.date);
  };

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const deleteTaskHandler = (id) => {
    if (window.confirm("Are you sure to delete this itask") === true) {
      const delTask = tasks.filter((task) => task.id !== id);
      setTasks(delTask);
    }
  };

  const completeTaskHadler = (id) => {
     setTasks(
        tasks.map((task)=>{
            if(task.id === id){
               return {...task, complete:true}
            }
        })
     )
  };

  return (
    <div className="taskManager">
      <h1 className="taskManagerTitle">Task Manager</h1>
      <div className="formTask">
        <div className="formCard">
          <form className="formControl" onSubmit={submitHandler}>
            <div>
              <label htmlFor="name">Task: </label>
              <input
                ref={nameInputRef}
                type="text"
                className="formControlName"
                placeholder="Task Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                name="date"
                className="formControlDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button type="submit" className="taskBtn">
              {isEditing ? "Edit Task" : "Save Task"}
            </button>
          </form>
        </div>
      </div>
      <article className="articleLists">
        <div className="articleList">
          <h2 className="articleListTitle">Task Lists</h2>
          <div className="line"></div>
          {tasks.length === 0 ? (
            <p className="noTaskAdded">No Task Added..</p>
          ) : (
            <div>
              {tasks.map((task) => {
                return (
                  <Task
                    {...task}
                    editTask={editTaskHandler}
                    deleteTask={deleteTaskHandler}
                    completeTask={completeTaskHadler}
                  />
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default TaskManager;
