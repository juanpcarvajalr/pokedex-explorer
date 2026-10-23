// Constantes de la PokéAPI: URL base, tamaño de página e imagen oficial
export const BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;
export const ARTWORK_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
