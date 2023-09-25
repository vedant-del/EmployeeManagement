import React from "react";
import TaskModel from "../Layouts/TaskModel";
import axios from "axios";
const Swal = require("sweetalert2");

const TaskBox = ({ prod,iseditable }) => {
console.log(prod);
let customerList = prod.map((item, i) => {
  return (
    <div className="card mt-4 p-3">
      <div className="row">
        <div className="col-4">
          <h4 className="text-primary">Task Name</h4>
          {item.TaskName}
        </div>
        <div className="col-4">
          <h4 className="text-primary">Description</h4>
          {item.Description}
        </div>
        
        <div className="col-4">
          <h4 className="text-primary">End Date</h4>
          {item.EndDate}
        </div>
        <div className="col-4">
          <h4 className="text-primary">To Employee</h4>
          {item.ToEmployeeName}
        </div>
        <div className="col-4">
          <h4 className="text-primary">From Employee</h4>
          {item.FromEmployeeName}
        </div>

        <div className="col-4">
        <h4 className="text-primary">Status</h4>
          {iseditable !== false && localStorage.getItem('admin') !== "1"?(<div className="col-4"><select value={item.status} data-width="50%" class="form-select" onChange={(e)=> updateStatus(item.id,e.target.value)}>
            
            <option value="To Do">To Do</option>
            <option value="Done">Done</option>
            
          </select></div>):(item.status)}
          
        </div>
        <TaskModel />
      </div>
    </div>

  )
}, this);
const updateStatus = (id,value)=>{
  const formData = new FormData();
  formData.append("id", id);
  formData.append('status', value);
  axios.post("http://localhost:5000/update/taskStatus", formData, {
    headers: {
      Accept: "auth",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      // setBillList(response.data.result);
      if (response.data.success === true) {
        window.location.href=window.location.href;
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          // timer: 1500,
        });

      }
    }).catch((err) => {
      Swal.fire({
        icon: "warning",
        title: err.response.data.message,
        showConfirmButton: true,
      });
    });


}
  

  return (
    <>
    <div>
      {customerList}
    </div>
    </>
  );
};

export default TaskBox;
