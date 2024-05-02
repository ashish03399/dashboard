import React from "react";
import "./taskColumn.css";

export default function TaskColumn({ title, children }) {
  // Define the modal content

  return (
    <div className="column">
      <div className="title">
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
