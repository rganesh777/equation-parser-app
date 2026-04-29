import { useState } from "react";
import nearley from "nearley";
import grammar from "../../grammar.js";

import AstTree from "../AstTree/index.jsx";
import ParserForm from "../ParserForm/index.jsx";
import { evaluate } from "../../utils/evaluate.js";
import styles from "./Parser.module.css";

const compiledGrammar = nearley.Grammar.fromCompiled(grammar);

const Parser = () => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState(null);
  const [parsedNode, setParsedNode] = useState(null);
  const [error, setError] = useState(null);

  const clearParse = () => {
    setEquation("");
    setParsedNode(null);
    setResult(null);
    setError(null);
  };

  const handleParse = () => {
    if (!equation.trim()) {
      clearParse();
      return;
    }

    try {
      const parser = new nearley.Parser(compiledGrammar);
      const source = equation.replaceAll(/\s+/g, "");
      parser.feed(source);
      const results = parser.results;

      if (results.length === 0) {
        throw new Error("No results.");
      }

      const node = results[0];
      setParsedNode(node);
      setResult(evaluate(node));
      setError(null);
    } catch (e) {
      setError(e.message.split(" Instead")[0]);
      setParsedNode(null);
      setResult(null);
    }
  };

  return (
    <div className="parser">
      <ParserForm
        equation={equation}
        setEquation={setEquation}
        handleParse={handleParse}
        clearParse={clearParse}
      />

      {error && <pre className={`${styles.error} fail`}>Error: {error}</pre>}

      {parsedNode && (
        <div className={styles.result}>
          <pre>
            Result:{" "}
            <span className={result === true ? "pass" : "fail"}>
              {JSON.stringify(result)}
            </span>
          </pre>
          <h4>Parsed Abstract Syntax Tree (AST)</h4>
          <AstTree node={parsedNode} />
        </div>
      )}
    </div>
  );
};

export default Parser;
