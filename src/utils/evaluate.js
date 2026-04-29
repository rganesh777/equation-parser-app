// evaluate.js
export function evaluate(node) {
  switch (node.type) {
    case "Number":
      return node.value;

    case "Group":
      return evaluate(node.expr);

    case "BinaryExpr":
      const left = evaluate(node.left);
      const right = evaluate(node.right);

      switch (node.op) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return left / right;
        case "=":
          return left === right;
        case "!=":
          return left !== right;
        default:
          throw new Error(`Unknown operator: ${node.op}`);
      }

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}
