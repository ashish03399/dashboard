import { Button, TextField } from "@mui/material";
import "./createColumn.css";
import { useState } from "react";

export default function CreateColumn({ onAddColumn }) {
  const [column, setColumn] = useState("");
  const onSubmit = () => {
    onAddColumn(column);
    setColumn("");
  };
  return (
    <div className="create-form">
      <TextField
        label="Column Name"
        variant="outlined"
        size="small"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
      />
      <Button
        data-testid="add-column-button"
        variant="contained"
        onClick={onSubmit}
      >
        Add Column
      </Button>
    </div>
  );
}
