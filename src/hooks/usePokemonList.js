import { useState, useEffect } from "react";
import { POKEAPI_BASE } from "../utils/constants";

const CHUNK_SIZE = 100;

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [progress, setProgress]       = useState(0);
  const [error, setError]             = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setProgress(0);

      const countRes = await fetch(`${POKEAPI_BASE}/pokemon?limit=1`);
      if (!countRes.ok) throw new Error("Failed to reach PokéAPI");
      const { count } = await countRes.json();

      const offsets = [];
      for (let off = 0; off < count; off += CHUNK_SIZE) offsets.push(off);

      const all = [];
      for (let i = 0; i < offsets.length; i++) {
        if (cancelled) return;

        const listRes = await fetch(
          `${POKEAPI_BASE}/pokemon?limit=${CHUNK_SIZE}&offset=${offsets[i]}`
        );
        const listJson = await listRes.json();

        const details = await Promise.all(
          listJson.results.map((p) => fetch(p.url).then((r) => r.json()))
        );

        all.push(...details);

        if (!cancelled) {
          setProgress(Math.round(((i + 1) / offsets.length) * 100));
          setPokemonList([...all]);
        }
      }

      if (!cancelled) setLoading(false);
    }

    fetchAll().catch((err) => {
      if (!cancelled) {
        setError(err.message);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  const loadMore    = () => {};
  const loadingMore = false;
  const hasMore     = false;

  return { pokemonList, loading, loadingMore, hasMore, error, loadMore, progress };
}