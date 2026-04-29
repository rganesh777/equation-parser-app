import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ParserForm from ".";

describe("ParserForm", () => {
  const renderComponent = (props) => {
    return render(
      <ParserForm
        equation={props.equation || ""}
        setEquation={props.setEquation || (() => {})}
        handleParse={props.handleParse || (() => {})}
        clearParse={props.clearParse || (() => {})}
      />,
    );
  };

  it("renders without crashing", () => {
    renderComponent({});

    expect(screen.getByLabelText(/enter an equation/i)).toBeInTheDocument();
    expect(screen.getByTestId("equation-input")).toBeInTheDocument();
    expect(screen.getByTestId("parse-button")).toBeInTheDocument();
  });

  it("calls setEquation on input change", () => {
    const mockSetEquation = vi.fn();

    renderComponent({
      equation: "",
      setEquation: mockSetEquation,
      handleParse: () => {},
      clearParse: () => {},
    });

    const inputElement = screen.getByTestId("equation-input");
    fireEvent.change(inputElement, { target: { value: "2 * 3 + 4 = 10" } });
    expect(mockSetEquation).toHaveBeenCalledWith("2 * 3 + 4 = 10");
  });

  it("calls handleParse on Parse button click", () => {
    const mockHandleParse = vi.fn();
    renderComponent({
      equation: "",
      setEquation: () => {},
      handleParse: mockHandleParse,
      clearParse: () => {},
    });

    const parseButton = screen.getByTestId("parse-button");
    fireEvent.click(parseButton);
    expect(mockHandleParse).toHaveBeenCalled();
  });

  it("calls clearParse on Clear button click", () => {
    const mockClearParse = vi.fn();
    renderComponent({
      equation: "",
      setEquation: () => {},
      handleParse: () => {},
      clearParse: mockClearParse,
    });

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);
    expect(mockClearParse).toHaveBeenCalled();
  });
});
