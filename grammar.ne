@preprocessor esmodule

@{%
    const moo = require('moo')

    let lexer = moo.compile({
        ws: /[ \t]+/,
        number:  {match: /0|[1-9]\d*/, value: s => Number(s)},
        multiply: '*',
        divide: '/',
        plus: '+',
        minus: '-',
        eq: '=',
        notEq: '!=',
        lparen: '(',
        rparen: ')'
    });
%}

@lexer lexer

main -> expr %eq    expr {% ([l,,r]) => ({ type: 'BinaryExpr', op: '=',  left: l, right: r }) %}
      | expr %notEq expr {% ([l,,r]) => ({ type: 'BinaryExpr', op: '!=', left: l, right: r }) %}

expr -> expr %plus  term {% ([a,,b]) => ({ type: 'BinaryExpr', op: '+', left: a, right: b }) %}
      | expr %minus term {% ([a,,b]) => ({ type: 'BinaryExpr', op: '-', left: a, right: b }) %}
      | term {% ([t]) => t %}

term -> term %multiply number {% ([a,,b]) => ({ type: 'BinaryExpr', op: '*', left: a, right: b }) %}
      | term %divide   number {% ([a,,b]) => ({ type: 'BinaryExpr', op: '/', left: a, right: b }) %}
      | number {% ([n]) => n %}

number -> %number {% ([n]) => ({ type: 'Number', value: n.value }) %}
        | %lparen expr %rparen {% ([,e,]) => ({ type: 'Group',  expr: e }) %}
