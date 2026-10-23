// Custom hook: ficha de un Pokémon por nombre o id, con reintento
import { useCallback, useEffect, useState } from 'react';
import { MESSAGES } from '../constants/messages';
import { STATUS } from '../constants/status';
import { getPokemonDetail } from '../services/pokemonAPI';

//   const { status, pokemon, errorMessage, retry } = usePokemonDetail(nameOrId);
//
export default function usePokemonDetail(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (nameOrId === undefined || nameOrId === null || nameOrId === '') {
      setPokemon(null);
      setStatus(STATUS.IDLE);
      setErrorMessage('');
      return;
    }

    const controller = new AbortController();

    const loadDetail = async () => {
      setStatus(STATUS.LOADING);
      setErrorMessage('');
      setPokemon(null);

      try {
        const result = await getPokemonDetail(nameOrId, controller.signal);
        setPokemon(result);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        // Si la petición fue cancelada no es un error real
        if (error.name === 'AbortError') {
          return;
        }
        if (error.status === 404) {
          setStatus(STATUS.EMPTY);
          setErrorMessage(MESSAGES.empty(String(nameOrId)));
          return;
        }
        setStatus(STATUS.ERROR);
        setErrorMessage(MESSAGES.error);
      }
    };

    loadDetail();
    return () => controller.abort(); // cleanup del useEffect
  }, [nameOrId, reloadKey]); // Matriz de dependencias: solo si cambia el id o se reintenta

  const retry = useCallback(() => {
    setReloadKey((previous) => previous + 1);
  }, []);

  return {
    status,
    pokemon,
    errorMessage,
    retry,
  };
}
