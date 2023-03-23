import { useState } from "react";
export function usePokedex() {
  const [dettagli, setDettagli] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function altreInfo(idPokemon) {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`
      );
      const json = await response.json();

      if (idPokemon === "") {
        setError(true);
        setLoading(false);
        return;
      }
      setDettagli(json);
    } catch (error) {
      setError(error);
      setDettagli(null);
    } finally {
      setLoading(false);
    }
  }
  return {
    dettagli,
    loading,
    error,
    altreInfo,
  };
}

export default function Moreinfo({ namePoke }) {
  const { dettagli, loading, error, altreInfo } = usePokedex(namePoke);

  function handleClick() {
    altreInfo(namePoke);
  }

  return (
    <>
      <button onClick={handleClick}>More info</button>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error!</h1>}
      {dettagli && <h1>Color: {dettagli.color.name}</h1>}
    </>
  );
}
