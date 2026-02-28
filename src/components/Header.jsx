import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.bolt}>⚡</span>
        <div>
          <h1 className={styles.title}>POKÉDEX</h1>
          <p className={styles.sub}>GOTTA CATCH 'EM ALL</p>
        </div>
        <span className={styles.bolt}>⚡</span>
      </div>
    </header>
  );
}
