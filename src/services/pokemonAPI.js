// Único lugar donde se llama fetch a la PokéAPI; normaliza la respuesta para la UI
import { BASE_URL, PAGE_SIZE, ARTWORK_URL } from '../config/api';
import {
  extractIdFromUrl,
  decimetersToMeters,
  hectogramsToKilograms,
} from '../utils/formatters';

const request = async (url, signal) => {
  const response = await fetch(url, { signal }); // fetch + async/await
  // response.ok es false con 404 o 500; la PokéAPI responde 404 con texto, no JSON
  if (!response.ok) {
    const error = new Error(`Error http: ${response.status}`);
    error.status = response.status; // los hooks usan status === 404 para "sin resultados"
    throw error;
  }
  return response.json(); // JSON: solo se parsea si la respuesta fue correcta
};

const mapListItem = ({ name, url }) => {
  const id = extractIdFromUrl(url);
  return {
    id,
    name,
    imageUrl: ARTWORK_URL(id),
  };
};

const mapPokemon = (data) => {
  const types = (data.types ?? []).map((entry) => entry.type.name);
  const stats = (data.stats ?? []).map((entry) => ({
    name: entry.stat.name,
    value: entry.base_stat,
  }));

  return {
    id: data.id,
    name: data.name,
    imageUrl:
      data.sprites?.other?.['official-artwork']?.front_default ??
      ARTWORK_URL(data.id),
    heightM: decimetersToMeters(data.height),
    weightKg: hectogramsToKilograms(data.weight),
    types,
    stats,
  };
};

// ---------------------------------------------------------------
// 1) getPokemonList = Lista paginada
// La lista solo trae name y url: el id se saca del final de la url
// ---------------------------------------------------------------
export const getPokemonList = async (
  limit = PAGE_SIZE,
  offset = 0,
  signal,
) => {
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  const data = await request(url, signal);
  const items = (data.results ?? []).map(mapListItem);
  return {
    items,
    hasMore: data.next !== null,
  };
};

// ---------------------------------------------------------------
// 2) getPokemonDetail = Ficha por nombre o número
// Normaliza la entrada y distingue 404 (no encontrado) del resto
// ---------------------------------------------------------------
export const getPokemonDetail = async (nameOrId, signal) => {
  const query = String(nameOrId).trim().toLowerCase();
  const url = `${BASE_URL}/pokemon/${encodeURIComponent(query)}`;
  const data = await request(url, signal);
  return mapPokemon(data);
};
