import { useEffect, useState } from "react";
import { getPokemons } from "../api";
import { Pokemon } from "../types";

export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    useEffect(() => {
        getPokemons().then((data) => setPokemons(data));
    }, []);
    
    return pokemons;
}