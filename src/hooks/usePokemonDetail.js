import { useState, useEffect } from "react";
import { POKEAPI_BASE } from "../utils/constants";

export function usePokemonDetail(pokemon) {
  const [species, setSpecies]     = useState(null);
  const [loadingSpec, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemon) { setSpecies(null); return; }
    let cancelled = false;
    setLoading(true);
    setSpecies(null);
    fetch(`${POKEAPI_BASE}/pokemon-species/${pokemon.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const entry = data.flavor_text_entries.find((e) => e.language.name === "en");
        const genus = data.genera.find((g) => g.language.name === "en");
        setSpecies({
          description: entry?.flavor_text.replace(/\f|\n/g, " ") ?? "No description available.",
          genus: genus?.genus ?? "",
        });
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setSpecies({ description: "No description available.", genus: "" });
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [pokemon]);

  return { species, loadingSpec };
}
