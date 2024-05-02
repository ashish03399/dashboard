import { render, screen, fireEvent } from "@testing-library/react";
import CreateTask from "./CreateTask";

describe("CreateTask", () => {
  test("renders the create task button", () => {
    render(<CreateTask />);

    const addButton = screen.getByTestId("add-task-button");

    expect(addButton).toBeInTheDocument();
  });
});
