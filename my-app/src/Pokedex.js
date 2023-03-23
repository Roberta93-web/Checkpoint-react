import { useRef } from "react";
import Moreinfo from "./Moreinfo";
import { usePokedex } from "./usePokedex";

export default function Pokedex() {
  const { pokemon, loading, error, searchPokemon } = usePokedex();
  const inputRef = useRef();

  function handleClick() {
    const input = inputRef.current.value;
    searchPokemon(input);
  }
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Info</button>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error!</h1>}
      {pokemon && <h1>Name: {pokemon.name}</h1>}
      {pokemon && <h2>Base Experience: {pokemon.base_experience}</h2>}
      {pokemon && <img src={pokemon.sprites.front_default} />}
      {pokemon && (
        <h2>
          Abilities:{" "}
          {pokemon.abilities.map((item, index) => (
            <p key={index}>{item.ability.name}</p>
          ))}
        </h2>
      )}
      {pokemon && <Moreinfo namePoke={pokemon.name} />}
    </div>
  );
}
