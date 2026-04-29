# Equation Parser App

## How to run this app

Prerequisites: Node.js (>=16) and npm (or yarn).

1. Install dependencies
   - npm: `npm install`

2. Start dev server (Vite)
   - npm: `npm run dev`

3. Build for production
   - npm: `npm run build`

4. Run tests
   - npm: `npm test`

5. build Grammar.ne file
   - npm `npm run buildGrammar`

---

## Notes and Decisions made

- Learned and referenced the websites given. (Nearly, moo)
- expermented writing grammar.ne using the Nearley Parser Playground (with moo support)
- Compiled the ne file into js file to use it in the React App.
- Implemented Arithmetic Operators, comparison and followed standard precedence.
- White spaces ignored.
- User has the option to enter an equation or the clear the input box.
- Evaluation result and Abstract Syntax Tree (AST) are display for valid equations.
- Error handled is the equation is invalid and location of the error is displayed.
- React App using Vite.
- Parser, ParserForm, AstTree as seperate components.
- Unit tests with Vitest + Testing Library.
