// Textos visibles de los estados de carga, error y sin resultados
export const MESSAGES = {
  loading: 'Cargando Pokémon...',
  error: 'No se pudo conectar con la PokéAPI. Revisa tu internet.',
  retry: 'Reintentar',
  empty: (term) => `No encontramos ningún Pokémon con «${term}».`,
  backToList: 'Volver a la lista',
};
