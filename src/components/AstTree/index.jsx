import styles from "./AstTree.module.css";

const AstTree = ({ node }) => {
  if (!node) return null;

  const renderChildrenNode = (op, children) => {
    return (
      <div className={styles.node} data-testid="ast-node">
        <span className={styles.operator}>{op}</span>
        <div className={styles.children}>
          {children.map((child, index) => (
            <AstTree key={index} node={child} />
          ))}
        </div>
      </div>
    );
  };

  if (node?.type === "Number" || node?.expr?.type === "Number") {
    return (
      <div className={styles.node}>
        <span className={styles.number}>
          {node.value || node.expr?.value || 0}
        </span>
      </div>
    );
  }

  if (node?.type === "Group") {
    return renderChildrenNode(node.expr.op, [node.expr.left, node.expr.right]);
  }

  return renderChildrenNode(node.op, [node.left, node.right]);
};

export default AstTree;
