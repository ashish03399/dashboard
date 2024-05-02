import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

const mockDeleteTask = jest.fn(() =>
  console.log("================deleteTask called")
);
// Mocking the useTasks hook
jest.mock("../../hooks/useTasks", () => () => ({
  tasks: {
    todo: [{ name: "Task 1", column: "todo" }],
    inprogress: [],
    done: [],
    blocked: [],
  },
  addTask: jest.fn(),
  updateTask: jest.fn(),
  addColumn: jest.fn(),
  deleteTask: mockDeleteTask,
}));

describe("Dashboard", () => {
  test("renders column titles correctly", () => {
    render(<Dashboard />);

    // Asserting that column titles are rendered correctly
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  test("renders Add Task CTA correctly", () => {
    render(<Dashboard />);
    expect(screen.getAllByTestId("add-task-button").length).toBeGreaterThan(0);
  });

  test("renders remove Task button correctly", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  test("opens Add Task modal when a task is clicked", () => {
    render(<Dashboard />);

    const taskElement = screen.getAllByTestId("add-task-button")[0];
    fireEvent.click(taskElement);

    expect(screen.getByTestId("add-task")).toBeInTheDocument();
  });

  test("opens Update Task modal when a task is clicked", () => {
    render(<Dashboard />);

    const taskElement = screen.getByText("Task 1");
    fireEvent.click(taskElement);

    expect(screen.getByTestId("update-task")).toBeInTheDocument();
  });

  test("calls deleteTask function when a task is deleted", () => {
    render(<Dashboard />);

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalled();
  });

  test("renders Add Column CTA correctly", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("add-column-button")).toBeInTheDocument();
  });
});
