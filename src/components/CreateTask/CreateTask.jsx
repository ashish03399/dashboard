import { Button } from "@mui/material";
import { useState } from "react";
import "./create-task.css";
import AddEditTask from "../../features/AddEditTask/AddEditTask";

export default function CreateTask(props) {
  const [showModal, setShowModal] = useState(false);
  if (showModal) {
    return <AddEditTask {...props} setShowModal={setShowModal} />;
  }

  return (
    <div className="create-task">
      <Button
        data-testid="add-task-button"
        variant="contained"
        fullWidth
        onClick={() => setShowModal(!showModal)}
      >
        Add Task
      </Button>
    </div>
  );
}
