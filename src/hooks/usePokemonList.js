// Custom hook: lista paginada con scroll infinito, reintento y cancelación de peticiones
import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGE_SIZE } from '../config/api';
import { MESSAGES } from '../constants/messages';
import { STATUS } from '../constants/status';
import { getPokemonList } from '../services/pokemonAPI';

//   const { pokemons, status, isLoadingMore, errorMessage, loadMore, retry } = usePokemonList();
//
export default function usePokemonList() {
  const [pokemons, setPokemons] = useState([]); // useState: lista acumulada
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const isFetchingRef = useRef(false); // candado: onEndReached se dispara varias veces

  useEffect(() => {
    const controller = new AbortController(); // AbortController: cancela al cambiar offset o desmontar
    const isInitial = offset === 0;

    // async/await: la petición se espera dentro del efecto
    const loadPage = async () => {
      isFetchingRef.current = true;
      if (isInitial) {
        setStatus(STATUS.LOADING);
      } else {
        setIsLoadingMore(true);
      }
      setErrorMessage('');

      try {
        const { items, hasMore: more } = await getPokemonList(
          PAGE_SIZE,
          offset,
          controller.signal,
        );
        setPokemons((previous) => {
          if (isInitial) {
            return items;
          }
          const existingIds = new Set(previous.map((pokemon) => pokemon.id));
          const uniqueItems = items.filter((item) => !existingIds.has(item.id));
          return [...previous, ...uniqueItems];
        });
        setHasMore(more);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        // Si la petición fue cancelada no es un error real
        if (error.name === 'AbortError') {
          return;
        }
        setErrorMessage(MESSAGES.error);
        if (isInitial) {
          setStatus(STATUS.ERROR);
        }
      } finally {
        // finally: se ejecuta siempre (éxito o error), salvo si el cleanup ya abortó
        if (!controller.signal.aborted) {
          isFetchingRef.current = false;
          setIsLoadingMore(false);
        }
      }
    };

    loadPage();
    return () => controller.abort(); // cleanup del useEffect
  }, [offset, reloadKey]); // Matriz de dependencias: no incluir pokemons (provoca bucle)

  const loadMore = useCallback(() => {
    // Solo pide la siguiente página si la lista ya cargó bien y no hay error pendiente
    if (
      isFetchingRef.current ||
      !hasMore ||
      status !== STATUS.SUCCESS ||
      errorMessage
    ) {
      return;
    }
    isFetchingRef.current = true;
    setOffset((previous) => previous + PAGE_SIZE);
  }, [hasMore, status, errorMessage]);

  const retry = useCallback(() => {
    setReloadKey((previous) => previous + 1);
  }, []);

  return {
    pokemons,
    status,
    isLoadingMore,
    errorMessage,
    hasMore,
    loadMore,
    retry,
  };
}
