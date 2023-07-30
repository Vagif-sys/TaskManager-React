export  const taskReducer = (state, action) => {
    if (action.type === "EMPTY_FIELDS") {
      return {
        ...state,
        isAlertOpen: true,
        alertContent: "Please enter name and date",
        alertClass: "danger",
      };
    }
  
    if (action.type === "CLOSE_ALERT") {
      return { ...state, isAlertOpen: false };
    }
  
    if (action.type === "ADD_TASK") {
      console.log(action.payload);
      const AllTask = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: AllTask,
        isAlertOpen: true,
        alertContent: "Task Added",
        alertClass: "success",
      };
    }
  
    if (action.type === "OPEN_EDIT_MODAL") {
      return {
        ...state,
        isEditModalOpen: true,
        taskID: action.payload,
        modalTitle: "Edit Task",
        modalMsg: "You are about to edit this task",
        modalActionText: "Edit",
      };
    }
  
    if (action.type === "CLOSE_MODAL") {
      return { ...state, isEditModalOpen: false, isDeleteModalOpen: false };
    }
  
    if (action.type === "EDIT_TASK") {
      return { ...state, isEditing: true };
    }
  
    if (action.type === "UPDATE_TASK") {
      console.log(action.payload);
      const updatedTask = action.payload;
      const id = action.payload.id;
  
      const taskIndex = state.tasks.findIndex((task) => {
        return task.id === id;
      });
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
  
      return {
        ...state,
  
        isEditing: false,
        isAlertOpen: true,
        alertContent: "Task edited successfully",
        alertClass: "success",
      };
    }
  
    if (action.type === "OPEN_DELETE_MODAL") {
      return {
        ...state,
  
        taskID: action.payload,
        isDeleteModalOpen: true,
        modalTitle: "DELETE TASK",
        modalMsg: "Do you want to delete this task",
        mocalActionText: "DELETE",
      };
    }
  
    if (action.type === "DELETE_TASK") {
      const id = action.payload;
      const deleteTask = state.tasks.filter((task) => task.id !== id);
  
      return {
        ...state,
        tasks: deleteTask,
        isAlertOpen: true,
        alertContent: "Task deleted successfully",
        alertClass: "success",
        isDeleteModalOpen: false,
      };
    }
  
    if (action.type === "COMPLETE_TASK") {
        
         const id = action.payload
         const completeTaskIndex = state.tasks.findIndex((task)=>{
              return task.id === id
         })
         
         let updatedTask = {
  
            id,
            name: state.tasks[completeTaskIndex].name,
            date: state.tasks[completeTaskIndex].date,
            complete:true,
         }
  
         if(completeTaskIndex !== -1){
             state.tasks[completeTaskIndex] = updatedTask
         }
  
         return {
  
             ...state,
             isAlertOpen:true,
             alertContent:'Task Completed',
             alertClass:'success'
         }
    }
  
    return state;
  };