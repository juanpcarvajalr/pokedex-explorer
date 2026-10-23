// Funciones puras de formato y conversión usadas por servicios y componentes

// Número de Pokédex con 3 dígitos: 25 → "#025"
export const formatPokemonNumber = (id) => `#${String(id).padStart(3, '0')}`;

// Primera letra en mayúscula: "pikachu" → "Pikachu"
export const capitalize = (text) => {
  const value = String(text ?? '');
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';
};

// El id va al final de la url de la lista: ".../pokemon/1/" → 1
export const extractIdFromUrl = (url) => {
  const cleaned = String(url).replace(/\/+$/, '');
  const segments = cleaned.split('/');
  return Number(segments[segments.length - 1]);
};

// La API entrega altura en decímetros → metros
export const decimetersToMeters = (decimeters) => Number(decimeters) / 10;

// La API entrega peso en hectogramos → kilogramos
export const hectogramsToKilograms = (hectograms) => Number(hectograms) / 10;
