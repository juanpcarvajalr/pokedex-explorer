// Custom hook: búsqueda por nombre o número; 404 → empty (no encontrado)
import { useCallback, useEffect, useState } from 'react';
import { MESSAGES } from '../constants/messages';
import { STATUS } from '../constants/status';
import { getPokemonDetail } from '../services/pokemonAPI';

//   const {
//     searchText, setSearchText, query, pokemon, status, errorMessage, search, clearSearch, retry,
//   } = usePokemonSearch();
//
export default function usePokemonSearch() {
  const [searchText, setSearchText] = useState(''); // lo que el usuario escribe
  const [query, setQuery] = useState(''); // lo que realmente se busca
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const controller = new AbortController();

    // async/await + try/catch: la búsqueda se cancela si cambia query
    const loadResult = async () => {
      setStatus(STATUS.LOADING);
      setErrorMessage('');
      setPokemon(null);

      try {
        const result = await getPokemonDetail(query, controller.signal);
        setPokemon(result);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        // Si la petición fue cancelada no es un error real
        if (error.name === 'AbortError') {
          return;
        }
        if (error.status === 404) {
          setStatus(STATUS.EMPTY); // notFound: nombre o número inexistente
          setErrorMessage(MESSAGES.empty(query));
          return;
        }
        setStatus(STATUS.ERROR);
        setErrorMessage(MESSAGES.error);
      }
    };

    loadResult();
    return () => controller.abort(); // cleanup: cancela si cambia query o se desmonta
  }, [query, reloadKey]); // Matriz de dependencias

  const search = useCallback(() => {
    const nextQuery = String(searchText).trim().toLowerCase();
    if (!nextQuery) {
      return;
    }
    setQuery(nextQuery);
  }, [searchText]);

  const clearSearch = useCallback(() => {
    setSearchText('');
    setQuery('');
    setPokemon(null);
    setStatus(STATUS.IDLE);
    setErrorMessage('');
  }, []);

  const retry = useCallback(() => {
    setReloadKey((previous) => previous + 1);
  }, []);

  return {
    searchText,
    setSearchText,
    query,
    pokemon,
    status,
    errorMessage,
    search,
    clearSearch,
    retry,
  };
}
