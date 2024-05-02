import useTasks from "../../hooks/useTasks";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import CreateColumn from "../../components/CreateColumn/CreateColumn";
import CreateTask from "../../components/CreateTask/CreateTask";
import { useEffect, useMemo, useState } from "react";
import AddEditTask from "../AddEditTask/AddEditTask";
import React from "react";
import GroupTask from "../../components/GroupTask/GroupTask";
import {
  WORKFLOW_RULES,
  STATE as COLUMN_TITLE,
  getFields,
} from "../../rules/rules";
import Filter from "../../components/Filter/Filter";

export default function Dashboard() {
  const {
    filteredTask,
    addFilter,
    addTask,
    updateTask,
    addColumn,
    deleteTask,
    moveTask,
    clearFilter,
    reqfieldError,
    setReqFieldError,
    checkAllMandateFields,
    selectedTask,
    setSelectedTask,
  } = useTasks();
  const [dargState, setDragState] = useState("");
  const [showModal, setShowModal] = useState(false);

  const columns = useMemo(() => Object.keys(filteredTask), [filteredTask]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  useEffect(() => {
    if (dargState && showModal === false) {
      setDragState("");
      setReqFieldError("");
      handDragTask(dargState, selectedTask);
    }
  }, [selectedTask]);

  const handDragTask = (newStage, task) => {
    //refactoring we can pass task id and then fetch is from store/state instead of passing whole task
    if (WORKFLOW_RULES[task.column].includes(newStage)) {
      if (checkAllMandateFields(task, newStage)) {
        moveTask(newStage, task);
        setSelectedTask(task);
      } else {
        setDragState(newStage);
        setShowModal(true);
        setSelectedTask(task);
      }
    } else {
      alert("Please follow provided workflow");
    }
  };

  const Columns = useMemo(() => Object.keys(COLUMN_TITLE), []);

  const filterTasks = (key, value) => {
    addFilter(key, value);
  };

  const fields = getFields();

  return (
    <div>
      <h1>Swimlane</h1>
      {/* TODO: create separate component for such action */}
      <div style={{ display: "flex" }}>
        {/* <CreateColumn onAddColumn={addColumn} /> */}
        <Filter
          taskFields={fields}
          filterTasks={filterTasks}
          clearFilter={clearFilter}
        />
      </div>
      {showModal && (
        <AddEditTask
          task={selectedTask}
          updateTask={updateTask}
          column={selectedTask?.column || COLUMN_TITLE.TODO}
          setShowModal={setShowModal}
          newStage={dargState}
          reqfieldError={reqfieldError}
        />
      )}
      <div className="container">
        {Columns.map((status) => {
          return (
            <TaskColumn title={COLUMN_TITLE[status]} key={status}>
              {COLUMN_TITLE[status] === COLUMN_TITLE.TODO ? (
                <CreateTask
                  column={COLUMN_TITLE[columns?.[status]]}
                  addTask={addTask}
                  columns={columns}
                />
              ) : null}
              <GroupTask
                status={COLUMN_TITLE[status]}
                tasks={filteredTask[COLUMN_TITLE[status]]}
                deleteTask={deleteTask}
                handleTaskClick={handleTaskClick}
                handDragTask={handDragTask}
              ></GroupTask>
            </TaskColumn>
          );
        })}
      </div>
    </div>
  );
}
