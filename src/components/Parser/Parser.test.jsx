import Parser from ".";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Parser component", () => {
  it("renders without crashing", () => {
    render(<Parser />);
    expect(screen.getByLabelText(/enter an equation/i)).toBeInTheDocument();
  });

  it("parses and evaluates a valid equation", () => {
    render(<Parser />);
    const inputElement = screen.getByTestId("equation-input");
    const parseButton = screen.getByTestId("parse-button");
    fireEvent.change(inputElement, { target: { value: "2 * 3 + 4 = 10" } });
    fireEvent.click(parseButton);
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    expect(screen.getByText(/true/i)).toBeInTheDocument();
  });

  it("parses and evaluates a valid falsy equation", () => {
    render(<Parser />);
    const inputElement = screen.getByTestId("equation-input");
    const parseButton = screen.getByTestId("parse-button");
    fireEvent.change(inputElement, { target: { value: "2 * 3 + 4 != 10" } });
    fireEvent.click(parseButton);
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    expect(screen.getByText(/false/i)).toBeInTheDocument();
  });

  it("displays an error for invalid equations", () => {
    render(<Parser />);
    const inputElement = screen.getByTestId("equation-input");
    const parseButton = screen.getByTestId("parse-button");
    fireEvent.change(inputElement, { target: { value: "1 + (2 = 3" } });
    fireEvent.click(parseButton);
    screen.debug();
    expect(
      screen.getByText(/Syntax error at line 1 col 5:/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Unexpected eq token:/i)).toBeInTheDocument();
  });

  it("clears the input and results when Clear button is clicked", () => {
    render(<Parser />);
    const inputElement = screen.getByTestId("equation-input");
    const parseButton = screen.getByTestId("parse-button");
    const clearButton = screen.getByTestId("clear-button");
    fireEvent.change(inputElement, { target: { value: "2 * 3 + 4 = 10" } });
    fireEvent.click(parseButton);
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(inputElement.value).toBe("");
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument();
  });
});
