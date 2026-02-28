import { ALL_TYPES } from "../utils/constants";
import styles from "./SearchBar.module.css";

export default function SearchBar({ search, onSearchChange, typeFilter, onTypeChange }) {
  return (
    <div className={styles.bar}>
      <div className={styles.inputWrap}>
        <span className={styles.icon}>🔍</span>
        <input
          type="text"
          className={styles.input}
          placeholder="Search by name or #..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button className={styles.clear} onClick={() => onSearchChange("")}>✕</button>
        )}
      </div>
      <select
        className={styles.select}
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">ALL TYPES</option>
        {ALL_TYPES.map((t) => (
          <option key={t} value={t}>{t.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}
