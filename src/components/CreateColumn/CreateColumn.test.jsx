import { render, screen, fireEvent } from "@testing-library/react";
import CreateColumn from "./CreateColumn";

describe("CreateColumn", () => {
  test("renders the create column component", () => {
    render(<CreateColumn onAddColumn={() => {}} />);

    const columnNameInput = screen.getByLabelText("Column Name");
    const addButton = screen.getByTestId("add-column-button");

    expect(columnNameInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("calls onAddColumn with input value when add column button is clicked", () => {
    const mockOnAddColumn = jest.fn();
    render(<CreateColumn onAddColumn={mockOnAddColumn} />);

    const columnNameInput = screen.getByLabelText("Column Name");
    const addButton = screen.getByTestId("add-column-button");

    fireEvent.change(columnNameInput, { target: { value: "New Column" } });
    fireEvent.click(addButton);

    expect(mockOnAddColumn).toHaveBeenCalledWith("New Column");
  });
});
