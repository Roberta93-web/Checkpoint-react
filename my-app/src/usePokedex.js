import { useState } from "react";
export function usePokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchPokemon(namePokemon) {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
      );
      const json = await response.json();

      if (namePokemon === "") {
        setError(true);
        setLoading(false);
        return;
      }
      setPokemon(json);
    } catch (error) {
      setError(error);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }
  return {
    pokemon,
    loading,
    error,
    searchPokemon,
  };
}
