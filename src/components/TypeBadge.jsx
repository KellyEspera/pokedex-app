import { TYPE_COLORS } from "../utils/constants";
import styles from "./TypeBadge.module.css";

export default function TypeBadge({ type }) {
  const bg = TYPE_COLORS[type] || "#888";
  return (
    <span
      className={styles.badge}
      style={{ background: bg, boxShadow: `0 2px 8px ${bg}88` }}
    >
      {type}
    </span>
  );
}
