import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";

describe("Task", () => {
  const task = {
    name: "Test Task",
    description: "This is a test task",
    deadline: "2022-01-01",
    taskId: "123",
    column: "todo",
  };
  const onClick = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    render(<Task task={task} onClick={onClick} onDelete={onDelete} />);
  });

  test("renders task name correctly", () => {
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("renders task description correctly", () => {
    expect(screen.getByText("This is a test task")).toBeInTheDocument();
  });

  test("renders task deadline correctly", () => {
    expect(screen.getByText("01/01/2022")).toBeInTheDocument();
  });

  test("calls onClick function when task name is clicked", () => {
    const taskName = screen.getByText("Test Task");
    fireEvent.click(taskName);
    expect(onClick).toHaveBeenCalled();
  });

  test("calls onDelete function when delete button is clicked", () => {
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("123", "todo");
  });

  test("renders update task button correctly", () => {
    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  test("calls onClick function when update task button is clicked", () => {
    const updateButton = screen.getByText("Update Task");
    fireEvent.click(updateButton);
    expect(onClick).toHaveBeenCalled();
  });
});
