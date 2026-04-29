import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AstTree from ".";

describe("AstTree", () => {
  const NodeObj = {
    left: { type: "Number", value: 2 },
    right: { type: "Number", value: 3 },
  };

  it("renders without crashing", () => {
    // Render the component and check if it mounts successfully
    render(<AstTree node={null} />);
    expect(screen.queryByTestId("ast-node")).not.toBeInTheDocument();
  });

  it("renders a number node correctly", () => {
    const numberNode = { type: "Number", value: 42 };
    render(<AstTree node={numberNode} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders a binary expression node correctly", () => {
    const binaryNode = {
      type: "BinaryExpr",
      op: "+",
      ...NodeObj,
    };
    render(<AstTree node={binaryNode} />);
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders a group node correctly", () => {
    const groupNode = {
      type: "Group",
      expr: {
        type: "BinaryExpr",
        op: "*",
        ...NodeObj,
      },
    };
    render(<AstTree node={groupNode} />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
