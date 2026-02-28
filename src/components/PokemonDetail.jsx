import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { TYPE_COLORS, ARTWORK_URL, FALLBACK_SPRITE } from "../utils/constants";
import styles from "./PokemonDetail.module.css";

export default function PokemonDetail({ pokemon, onClose }) {
  const { species, loadingSpec } = usePokemonDetail(pokemon);
  const mainType    = pokemon.types[0].type.name;
  const accentColor = TYPE_COLORS[mainType] || "#888";

  return (
    <aside
      className={styles.panel}
      style={{ borderColor: `${accentColor}55`, boxShadow: `0 0 40px ${accentColor}22` }}
    >
      <button className={styles.closeBtn} onClick={onClose}>✕</button>

      {/* Hero */}
      <div className={styles.hero}>
        <div
          className={styles.spriteGlow}
          style={{ background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)` }}
        >
          <img
            className={styles.sprite}
            src={ARTWORK_URL(pokemon.id)}
            alt={pokemon.name}
            style={{ filter: `drop-shadow(0 0 20px ${accentColor}88)` }}
            onError={(e) => { e.target.src = FALLBACK_SPRITE(pokemon.id); }}
          />
        </div>
        <p className={styles.dexNum}>#{String(pokemon.id).padStart(3, "0")}</p>
        <h2 className={styles.name}>{pokemon.name}</h2>
        {species && <p className={styles.genus}>{species.genus}</p>}
        <div className={styles.types}>
          {pokemon.types.map((t) => <TypeBadge key={t.type.name} type={t.type.name} />)}
        </div>
      </div>

      {/* Info grid */}
      <div className={styles.infoGrid}>
        <InfoCell label="HEIGHT"   value={`${(pokemon.height / 10).toFixed(1)} m`} />
        <InfoCell label="WEIGHT"   value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
        <InfoCell label="BASE EXP" value={pokemon.base_experience ?? "—"} />
        <InfoCell label="ABILITIES" value={pokemon.abilities.slice(0, 2).map((a) => a.ability.name).join(", ")} />
      </div>

      {/* Pokédex entry */}
      {loadingSpec && <p className={styles.loadingSpec}>Loading entry…</p>}
      {species && !loadingSpec && (
        <Section title="POKÉDEX ENTRY">
          <p className={styles.description}>{species.description}</p>
        </Section>
      )}

      {/* Stats */}
      <Section title="BASE STATS">
        {pokemon.stats.map((s) => (
          <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
        ))}
      </Section>

      {/* Moves */}
      <Section title={`MOVES (${Math.min(pokemon.moves.length, 24)} shown)`}>
        <div className={styles.pills}>
          {pokemon.moves.slice(0, 24).map((m) => (
            <span key={m.move.name} className={styles.pill}>{m.move.name}</span>
          ))}
        </div>
      </Section>
    </aside>
  );
}

function InfoCell({ label, value }) {
  return (
    <div className={styles.infoCell}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <p className={styles.sectionTitle}>{title}</p>
      {children}
    </div>
  );
}
