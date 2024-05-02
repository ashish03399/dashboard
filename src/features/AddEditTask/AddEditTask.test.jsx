import { render, screen } from "@testing-library/react";
import AddEditTask from "./AddEditTask";

describe("AddEditTask", () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockSetShowModal = jest.fn();

  const defaultProps = {
    column: "To Do",
    addTask: mockAddTask,
    updateTask: mockUpdateTask,
    task: null,
    setShowModal: mockSetShowModal,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with the correct title", () => {
    render(<AddEditTask {...defaultProps} />);
    const title = screen.getAllByText("Add Task");
    expect(title.length).toBeGreaterThan(0);
  });

  test("renders the component with the Update task when editing a task", () => {
    const task = {
      taskId: 1,
      name: "Test Task",
      description: "Test Description",
      deadline: "2022-01-01",
    };
    render(<AddEditTask {...defaultProps} task={task} />);
    const title = screen.getAllByText("Update Task");
    expect(title.length).toBeGreaterThan(0);
  });

  test("disables the submit button when required fields are empty", () => {
    render(<AddEditTask {...defaultProps} />);
    const addTaskButton = screen.getByTestId("add-task");
    expect(addTaskButton).toBeDisabled();
  });
});
