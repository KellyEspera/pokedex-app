import { useState } from "react";

import Header        from "./components/Header";
import SearchBar     from "./components/SearchBar";
import PokemonList   from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

import { usePokemonList }   from "./hooks/usePokemonList";
import { usePokemonFilter } from "./hooks/usePokemonFilter";

import styles from "./App.module.css";

export default function App() {
  const { pokemonList, loading, loadingMore, hasMore, error, loadMore, progress } = usePokemonList();
  const { filtered, search, setSearch, typeFilter, setTypeFilter } = usePokemonFilter(pokemonList);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (loading && pokemonList.length === 0) {
    return (
      <div className={styles.centred}>
        <span className={styles.loadingBall}>◉</span>
        <p className={styles.loadingText}>LOADING POKÉMON…</p>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.progressLabel}>{progress}%</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centred}>
        <p className={styles.errorText}>ERROR: {error}</p>
        <p className={styles.errorSub}>Check your connection and reload.</p>
      </div>
    );
  }

  const detailOpen = selectedPokemon !== null;

  return (
    <div className={styles.app}>
      <Header />

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={(val) => { setTypeFilter(val); setSelectedPokemon(null); }}
      />

      <main className={`${styles.content} ${detailOpen ? styles.split : ""}`}>
        <PokemonList
          pokemon={filtered}
          selectedId={selectedPokemon?.id ?? null}
          onSelect={setSelectedPokemon}
          loadMore={loadMore}
          loadingMore={loadingMore}
          hasMore={hasMore && !search && !typeFilter}
          compact={detailOpen}
        />

        {detailOpen && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </main>
    </div>
  );
}