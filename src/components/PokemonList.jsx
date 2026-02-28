import PokemonCard from "./PokemonCard";
import styles from "./PokemonList.module.css";

export default function PokemonList({
  pokemon,
  selectedId,
  onSelect,
  loadMore,
  loadingMore,
  hasMore,
  compact,
}) {
  if (pokemon.length === 0) {
    return (
      <div className={styles.empty}>
        <span>😵</span>
        <p>No Pokémon found. Try a different search!</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <p className={styles.count}>{pokemon.length} Pokémon found</p>

      <div className={`${styles.grid} ${compact ? styles.compact : ""}`}>
        {pokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            isSelected={selectedId === p.id}
            onClick={(pok) => onSelect((prev) => (prev?.id === pok.id ? null : pok))}
          />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreRow}>
          <button className={styles.loadMore} onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "LOADING…" : "LOAD MORE"}
          </button>
        </div>
      )}
    </section>
  );
}
