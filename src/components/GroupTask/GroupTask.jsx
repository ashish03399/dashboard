import React, { useRef } from "react";
import "./groupTask.css";
import Task from "../../components/Task/Task";

export default function GroupTask({ status, tasks, deleteTask, handleTaskClick, handDragTask }) {
  // Define the modal content

  const columnRef = useRef();

  const onDrop = (event) => {
    event.preventDefault()
    var taskId = event.dataTransfer.getData("taskId");
    console.log('Ashish-ref', columnRef.current.dataset.stage, taskId);
    handDragTask(columnRef.current.dataset.stage, JSON.parse(taskId));
  }

  const allowDrop = (event) => {
    console.log('Ashish-allowDrop', event);
    event.preventDefault()
  }

  return (
    <div ref={columnRef} data-stage={status} onDrop={onDrop} onDragOver={allowDrop} className="column-task-list">
      <div className="task-list">
        {tasks?.map((task) => {
          return (
            <Task
              task={task}
              key={task.name}
              onDelete={deleteTask}
              onClick={() => handleTaskClick(task)}
            />
          );
        })}
      </div>
    </div>
  );
}
