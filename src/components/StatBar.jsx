import { STAT_LABELS } from "../utils/constants";
import styles from "./StatBar.module.css";

export default function StatBar({ name, value }) {
  const pct   = Math.min((value / 255) * 100, 100);
  const color = value >= 100 ? "#4ade80" : value >= 60 ? "#facc15" : "#f87171";
  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.label}>{STAT_LABELS[name] || name.toUpperCase()}</span>
        <span className={styles.value} style={{ color }}>{value}</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
}
