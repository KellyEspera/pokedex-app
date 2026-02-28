import { useState } from "react";
import TypeBadge from "./TypeBadge";
import { TYPE_COLORS, ARTWORK_URL, FALLBACK_SPRITE } from "../utils/constants";
import styles from "./PokemonCard.module.css";

export default function PokemonCard({ pokemon, isSelected, onClick }) {
  const [imgSrc, setImgSrc]       = useState(ARTWORK_URL(pokemon.id));
  const [imgFailed, setImgFailed] = useState(false);

  const mainType    = pokemon.types[0].type.name;
  const accentColor = TYPE_COLORS[mainType] || "#888";

  // If both artwork AND fallback sprite fail, hide the card entirely
  if (imgFailed) return null;

  return (
    <article
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      style={
        isSelected
          ? {
              borderColor: accentColor,
              background: `linear-gradient(135deg, ${accentColor}33 0%, #0f0f23 100%)`,
              boxShadow: `0 0 20px ${accentColor}55`,
            }
          : {}
      }
      onClick={() => onClick(pokemon)}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = `${accentColor}66`;
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(pokemon)}
    >
      <div className={styles.ring} style={{ border: `18px solid ${accentColor}18` }} />

      <img
        className={styles.sprite}
        src={imgSrc}
        alt={pokemon.name}
        onError={() => {
          if (imgSrc === ARTWORK_URL(pokemon.id)) {
            // First failure: try the fallback sprite
            setImgSrc(FALLBACK_SPRITE(pokemon.id));
          } else {
            // Second failure: no image at all, hide the card
            setImgFailed(true);
          }
        }}
      />

      <p className={styles.dexNum}>#{String(pokemon.id).padStart(3, "0")}</p>
      <p className={styles.name}>{pokemon.name}</p>

      <div className={styles.types}>
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </article>
  );
}