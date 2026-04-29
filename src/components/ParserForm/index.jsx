import styles from "./ParserForm.module.css";

const ParserForm = ({ equation, setEquation, handleParse, clearParse }) => {
  const handleOnChange = (e) => {
    if (e.target.value === "") {
      clearParse();
    } else {
      setEquation(e.target.value);
    }
  };

  return (
    <div className="parser-form">
      <label htmlFor="equation" className={styles.label}>
        Enter an equation:
      </label>
      <input
        type="text"
        id="equation"
        name="equation"
        value={equation}
        data-testid="equation-input"
        placeholder="e.g. 2 * (3 + 4) = 14"
        onChange={handleOnChange}
        className={styles.input}
      />

      <div className={`flex ${styles.buttonGroup}`}>
        <button
          onClick={handleParse}
          className={styles.button}
          data-testid="parse-button"
        >
          Parse
        </button>
        <button
          onClick={clearParse}
          className={styles.button}
          data-testid="clear-button"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ParserForm;
