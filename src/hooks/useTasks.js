import useLocalStorage from "./useLocalStorage";
import { STATE, getFields, getReqFieldStage } from "../rules/rules";
import { useEffect, useState } from "react";

const DEFAULT_TASKS = {
  [STATE.TODO]: [
    {
      taskId: 1,
      name: "Task 1",
      column: "To Do",
      description: "Dummy Task",
      deadline: new Date(2023, 10, 10),
    },
    {
      taskId: 2,
      name: "Task 2",
      column: "To Do",
      description: "Dummy Task 2",
      deadline: new Date(2023, 9, 10),
    },
    {
      taskId: 3,
      name: "Task 3",
      column: "To Do",
      description: "Dummy Task 3",
      deadline: new Date(2023, 8, 10),
    },
    {
      taskId: 4,
      name: "Task 4",
      column: "To Do",
      description: "Dummy Task",
      deadline: new Date(2023, 8, 10),
    },
  ],
};

export default function useTasks() {
  const [tasksMap, setTasks] = useLocalStorage("tasks", DEFAULT_TASKS);
  const [filterTasksMap, setFilterTasksMap] = useState({});
  const [reqfieldError, setReqFieldError] = useState();
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    setFilterTasksMap(tasksMap);
  }, [tasksMap]);

  const [taskCounter, setTasksCounter] = useLocalStorage(
    "tasks-counter",
    Object.values(tasksMap).flat().length + 1
  );

  const addTask = (task) => {
    const newTasks = { ...tasksMap };
    if(!newTasks[task.column]){
      newTasks[task.column] = [];
    }
    newTasks[task.column].push({ ...task, taskId: taskCounter });
    setTasksCounter(taskCounter + 1);
    setTasks(newTasks);
  };

  const addFilter = (field, value) => {
    const filterTasks =  Object.keys(tasksMap).reduce((prev, curr) => {
      prev[curr] = tasksMap[curr]?.filter(task => {
        return task[field].toLowerCase().includes(value.toLowerCase());
      })
      return prev;
    }, {})
    setFilterTasksMap(filterTasks);
  }

  const clearFilter = () => {
    setFilterTasksMap(tasksMap);
  }

  const checkAllMandateFields = (task, newStage) => {
    let isValid = true;
    const mandateFieldObject =  getReqFieldStage(newStage)?.mandateFields;
    mandateFieldObject.forEach((field)=>{
      if(!task[field]){
        setReqFieldError(`"${getFields()[field]?.label}" should be updated before moving this ticket to "${newStage}" stage`);
        isValid = false
        return ;
      }
    })
    return isValid
  }

  const updateTask = (taskId, updatedTask, newStage) => {
    const updatedTasks = { ...tasksMap };
    updatedTasks[updatedTask.column] = updatedTasks[updatedTask.column]?.map(
      (task) => {
        if (task.taskId === taskId) {
          return { ...updatedTask, taskId };
        }
        return task;
      }
    );
    setTasks(updatedTasks);
    // it will update task which is selected somewhere
    setSelectedTask(updatedTask);
  };

  const moveTask = (newStage, task) => {
    if(!task.journney){
      task.journney = [task.column];
    }
    const updatedTasks = { ...tasksMap };
    const index = updatedTasks[task.column].findIndex(
      (taskObj) => {
        if (taskObj.taskId === task.taskId) {
          return true
        }
        return false;
      }
    );

    updatedTasks[task.column].splice(index, 1);
    task['column'] = newStage;
    if(!updatedTasks?.[newStage]?.length){
      updatedTasks[newStage] = [];
    }
    updatedTasks[newStage].push(task);
    task.journney.push(newStage)
    setTasks(updatedTasks);
  }

  const deleteTask = (taskId, taskColumn) => {
    const updatedTasks = { ...tasksMap };
    updatedTasks[taskColumn] = updatedTasks[taskColumn].filter((task) => {
      return task.taskId !== taskId;
    });
    setTasks(updatedTasks);
  };
  const addColumn = (columnName) => {
    if (!tasksMap.hasOwnProperty(columnName)) {
      const updatedTasks = { ...tasksMap };
      updatedTasks[columnName] = [];
      setTasks(updatedTasks);
    }
  };
  return { tasks: tasksMap, filteredTask:filterTasksMap, checkAllMandateFields, reqfieldError, setReqFieldError, clearFilter, addFilter, selectedTask, setSelectedTask, addTask, updateTask, deleteTask, addColumn, moveTask };
}
