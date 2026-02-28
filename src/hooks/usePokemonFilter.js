import { useState, useEffect } from "react";

export function usePokemonFilter(pokemonList) {
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filtered, setFiltered]     = useState([]);

  useEffect(() => {
    let result = pokemonList;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) => p.name.includes(q) || String(p.id).padStart(3, "0").includes(q)
      );
    }
    if (typeFilter) {
      result = result.filter((p) =>
        p.types.some((t) => t.type.name === typeFilter)
      );
    }
    setFiltered(result);
  }, [pokemonList, search, typeFilter]);

  return { filtered, search, setSearch, typeFilter, setTypeFilter };
}
