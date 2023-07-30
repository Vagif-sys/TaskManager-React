import React from "react";
import { BiCheckDouble,BiSolidEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs';

const Task = ({ id,name,date,complete,editTask, deleteTask, completeTask }) => {
 console.log(name)
  return <div key={id} className={complete ? 'task complete' : 'task'}>
 
       <span>
           <p><b>Task1: </b>{name}</p>
           <p><b>Date: </b>{date}</p>
       </span>
       <span>
          <button onClick={()=>editTask(id)} >
             <BiSolidEdit/>
          </button>
          <button>
              <BsTrash style={{backgroundColor:'red'}} onClick={()=>deleteTask(id)}/>
          </button>
          <button>
             <BiCheckDouble onClick={()=>completeTask(id)}/>
          </button>
       </span>
  </div>;
};

export default Task;
