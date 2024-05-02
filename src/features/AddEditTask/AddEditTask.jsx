import { useState } from "react";
import BoxModal from "../../components/BoxModal/BoxModal";
import { Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { STATE, getFields } from "../../rules/rules";

export default function AddEditTask({
  column = STATE.TODO,
  addTask,
  updateTask,
  task,
  setShowModal,
  newStage,
  reqfieldError
}) {
  const [data, setData] = useState({...task});

  const handleData = (field, value) => {
    data[field] = value;
    setData({...data});
  }
  const handleSubmit = () => {
    // add required check by config
    // if (data['name']) {
      if (task) {
        updateTask(task.taskId, {...data}, newStage);
      } else {
        addTask({
          ...data, column
        });
      }
      setShowModal(false);
    // }
  };

  const fields = getFields();
  const fieldsArr = Object.keys(getFields());

  return (
    <BoxModal open>
      <Typography variant="h6" className="add-task-title">
        {task ? "Update" : "Add"} Task
      </Typography>
      <Button style={{ float: 'right' }} onClick={() => setShowModal(false)}>Close</Button>
      <section style={{ float: 'right', color: 'red' }} className="task-form">
        {reqfieldError ? <div>{reqfieldError}</div> : null}
        {fieldsArr.map(fieldKey => {
          const field = fields[fieldKey];
          if (field.type === 'String' && field.label) {
            return <TextField
            key={field.fieldName}
              fullWidth
              required
              value={data[field.fieldName]}
              label={field.label}
              onChange={(e) => handleData(field.fieldName, e.target.value)}
            />
          } else if (field.type === 'Date') {
            return <LocalizationProvider  key={field.fieldName} dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast={true}
                value={data[field.fieldName] ? dayjs(data[field.fieldName]) : undefined}
                label={field.label}
                onChange={(v) => handleData(field.fieldName, v?.toString())}
              />
            </LocalizationProvider>
          }
          return null;
        })}

        <div>
          {task?.journney ? <div style={{color: 'grey'}}>History</div> : null}
          {task?.journney?.map(obj => {
            const jor = `${obj} -> `;
            return <span style={{color: 'grey'}} key={obj}>{jor}</span>
          })}
        </div>

        <Button
          variant="contained"
          size="large"
          fullWidth
          data-testid={`${task ? "update" : "add"}-task`}
          onClick={handleSubmit}
          // disabled={!taskName || !taskDescription || !deadline}
        >
          {task ? "Update" : "Add"} Task
        </Button>
      </section>
    </BoxModal>
  );
}
