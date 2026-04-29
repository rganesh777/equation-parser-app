import moo from "moo";

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) {
  return x[0];
}

let lexer = moo.compile({
  ws: /[ \t]+/,
  number: { match: /0|[1-9]\d*/, value: (s) => Number(s) },
  multiply: "*",
  divide: "/",
  plus: "+",
  minus: "-",
  eq: "=",
  notEq: "!=",
  lparen: "(",
  rparen: ")",
});
let Lexer = lexer;
let ParserRules = [
  {
    name: "main",
    symbols: ["expr", lexer.has("eq") ? { type: "eq" } : eq, "expr"],
    postprocess: ([l, , r]) => ({
      type: "BinaryExpr",
      op: "=",
      left: l,
      right: r,
    }),
  },
  {
    name: "main",
    symbols: ["expr", lexer.has("notEq") ? { type: "notEq" } : notEq, "expr"],
    postprocess: ([l, , r]) => ({
      type: "BinaryExpr",
      op: "!=",
      left: l,
      right: r,
    }),
  },
  {
    name: "expr",
    symbols: ["expr", lexer.has("plus") ? { type: "plus" } : plus, "term"],
    postprocess: ([a, , b]) => ({
      type: "BinaryExpr",
      op: "+",
      left: a,
      right: b,
    }),
  },
  {
    name: "expr",
    symbols: ["expr", lexer.has("minus") ? { type: "minus" } : minus, "term"],
    postprocess: ([a, , b]) => ({
      type: "BinaryExpr",
      op: "-",
      left: a,
      right: b,
    }),
  },
  { name: "expr", symbols: ["term"], postprocess: ([t]) => t },
  {
    name: "term",
    symbols: [
      "term",
      lexer.has("multiply") ? { type: "multiply" } : multiply,
      "number",
    ],
    postprocess: ([a, , b]) => ({
      type: "BinaryExpr",
      op: "*",
      left: a,
      right: b,
    }),
  },
  {
    name: "term",
    symbols: [
      "term",
      lexer.has("divide") ? { type: "divide" } : divide,
      "number",
    ],
    postprocess: ([a, , b]) => ({
      type: "BinaryExpr",
      op: "/",
      left: a,
      right: b,
    }),
  },
  { name: "term", symbols: ["number"], postprocess: ([n]) => n },
  {
    name: "number",
    symbols: [lexer.has("number") ? { type: "number" } : number],
    postprocess: ([n]) => ({ type: "Number", value: n.value }),
  },
  {
    name: "number",
    symbols: [
      lexer.has("lparen") ? { type: "lparen" } : lparen,
      "expr",
      lexer.has("rparen") ? { type: "rparen" } : rparen,
    ],
    postprocess: ([, e]) => ({ type: "Group", expr: e }),
  },
];
let ParserStart = "main";
export default { Lexer, ParserRules, ParserStart };
