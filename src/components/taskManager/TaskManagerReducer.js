import React, { useState, useEffect, useRef, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import "./TaskManager.css";
import Task from "./Task";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import { taskReducer } from "./taskReducer";


const TaskManagerReducer = () => {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const initialState = {
    tasks,
    taskID: null,
    isEditing: false,
    isAlertOpen: false,
    alertContent: "this is alert content",
    alertClass: "danger",
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    modalTitle: "Delete Task",
    modalMsg: "You are about to delete the task",
    modalActionText: "OK",
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !date) {
      dispatch({
        type: "EMPTY_FIELDS",
      });
    }

    if (name && date && state.isEditing) {
      const updateTask = {
        id: state.taskID,
        name,
        date,
        complete: false,
      };

      dispatch({
        type: "UPDATE_TASK",
        payload: updateTask,
      });
      setName("");
      setDate("");
      setTasks(
        tasks.map((task) => {
          if (task.id === updateTask.id) {
            return { ...task, name, date, complete: false };
          }

          return task;
        })
      );
      return;
    }

    if (name && date) {
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false,
      };

      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
      setName("");
      setDate("");
      setTasks([...tasks, newTask]);
    }
  };

  const openEditModal = (id) => {
    dispatch({
      type: "OPEN_EDIT_MODAL",
      payload: id,
    });
  };

  const editModal = () => {
    const id = state.taskID;
    dispatch({
      type: "EDIT_TASK",
      payload: id,
    });

    const thisTask = state.tasks.find((task) => task.id === id);
    setName(thisTask.name);
    setDate(thisTask.date);
    closeModal();
  };

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  });

  const openDeleteModal = (id) => {
    dispatch({
      type: "OPEN_DELETE_MODAL",
      payload: id,
    });
  };

  const deleteModal = () => {
    const id = state.taskID;
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
    const deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
  };



  const completeTask = (id) => {
    dispatch({
      type: "COMPLETE_TASK",
      payload: id,
    });

    

    setTasks(
        tasks.map((task)=>{
           if(task.id === id){
             return {...task,complete:true}
           }

           return task
        })

    )
  };

  const closeAlert = () => {
    dispatch({
      type: "CLOSE_ALERT",
    });
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  return (
    <div className="taskManager">
      {state.isAlertOpen && (
        <Alert
          alertContent={state.alertContent}
          alertClass={state.alertClass}
          onCloseAlert={closeAlert}
        />
      )}
      {state.isEditModalOpen && (
        <Confirm
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalAction={editModal}
          modalActionText={state.modalActionText}
          onCloseModal={closeModal}
        />
      )}

      {state.isDeleteModalOpen && (
        <Confirm
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalAction={deleteModal}
          modalActionText={state.modalActionText}
          onCloseModal={closeModal}
        />
      )}
      <h1 className="taskManagerTitle">Task Manager Recuder</h1>
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
              {state.isEditing ? "Edit Task" : "Save Task"}
            </button>
          </form>
        </div>
      </div>
      <article className="articleLists">
        <div className="articleList">
          <h2 className="articleListTitle">Task Lists</h2>
          <div className="line"></div>
          {state.tasks.length === 0 ? (
            <p className="noTaskAdded">No Task Added..</p>
          ) : (
            <div>
              {state.tasks.map((task) => {
                return (
                  <Task
                    {...task}
                    editTask={openEditModal}
                    deleteTask={openDeleteModal}
                    completeTask={completeTask}
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

export default TaskManagerReducer;
