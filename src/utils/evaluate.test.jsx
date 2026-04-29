import { evaluate } from "./evaluate";
import { describe, it, expect } from "vitest";

describe("evaluate function", () => {
  const NodeObj = {
    left: { type: "Number", value: 4 },
    right: { type: "Number", value: 2 },
  };

  it("evaluates simple numbers", () => {
    expect(evaluate({ type: "Number", value: 5 })).toBe(5);
  });

  it("evaluates addition", () => {
    const ast = {
      type: "BinaryExpr",
      op: "+",
      ...NodeObj,
    };
    expect(evaluate(ast)).toBe(6);
  });

  it("evaluates subtraction", () => {
    const ast = {
      type: "BinaryExpr",
      op: "-",
      ...NodeObj,
    };
    expect(evaluate(ast)).toBe(2);
  });

  it("evaluates multiplication", () => {
    const ast = {
      type: "BinaryExpr",
      op: "*",
      ...NodeObj,
    };
    expect(evaluate(ast)).toBe(8);
  });

  it("evaluates division", () => {
    const ast = {
      type: "BinaryExpr",
      op: "/",
      ...NodeObj,
    };
    expect(evaluate(ast)).toBe(2);
  });

  it("evaluates grouped expressions", () => {
    const ast = {
      type: "Group",
      expr: {
        type: "BinaryExpr",
        op: "+",
        left: { type: "Number", value: 2 },
        right: {
          type: "BinaryExpr",
          op: "*",
          ...NodeObj,
        },
      },
    };
    expect(evaluate(ast)).toBe(10); // 2 + (4 * 2) = 10
  });

  it("evaluates equality", () => {
    const ast = {
      type: "BinaryExpr",
      op: "=",
      ...NodeObj,
      right: { type: "Number", value: 4 },
    };
    expect(evaluate(ast)).toBe(true);
  });

  it("evaluates inequality", () => {
    const ast = {
      type: "BinaryExpr",
      op: "!=",
      ...NodeObj,
    };
    expect(evaluate(ast)).toBe(true);
  });
});
