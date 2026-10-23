// Pantalla principal: lista, scroll infinito y búsqueda por nombre o número
import { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import StatusView from '../components/StatusView';
import { MESSAGES } from '../constants/messages';
import { STATUS } from '../constants/status';
import usePokemonList from '../hooks/usePokemonList';
import usePokemonSearch from '../hooks/usePokemonSearch';
import { colors, radius, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets(); // safe area: respeta el notch
  const {
    pokemons,
    status: listStatus,
    isLoadingMore,
    errorMessage: listErrorMessage,
    loadMore,
    retry: retryList,
  } = usePokemonList();
  const {
    searchText,
    setSearchText,
    pokemon: searchPokemon,
    status: searchStatus,
    errorMessage: searchErrorMessage,
    search,
    clearSearch,
    retry: retrySearch,
  } = usePokemonSearch();

  // Si la búsqueda encuentra un Pokémon, abre la ficha y vuelve la UI a la lista
  useEffect(() => {
    if (searchStatus !== STATUS.SUCCESS || !searchPokemon) {
      return;
    }
    navigation.navigate('PokemonDetail', { nameOrId: searchPokemon.name });
    clearSearch();
  }, [searchStatus, searchPokemon, navigation, clearSearch]);

  const handlePressPokemon = useCallback(
    (pokemon) => {
      navigation.navigate('PokemonDetail', { nameOrId: pokemon.name });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <PokemonCard pokemon={item} onPress={handlePressPokemon} />
    ),
    [handlePressPokemon],
  );

  const renderFooter = useCallback(() => {
    if (isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={colors.primary} />
        </View>
      );
    }

    if (listErrorMessage && listStatus === STATUS.SUCCESS) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerError}>{listErrorMessage}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={retryList}
            style={({ pressed }) => [
              styles.footerButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.footerButtonText}>{MESSAGES.retry}</Text>
          </Pressable>
        </View>
      );
    }

    return null;
  }, [isLoadingMore, listErrorMessage, listStatus, retryList]);

  const isSearchActive =
    searchStatus === STATUS.LOADING ||
    searchStatus === STATUS.EMPTY ||
    searchStatus === STATUS.ERROR;

  const showListStatus =
    listStatus === STATUS.IDLE ||
    listStatus === STATUS.LOADING ||
    listStatus === STATUS.ERROR;

  let mainContent = null;

  if (isSearchActive) {
    // Renderizado condicional: estados de la búsqueda
    mainContent = (
      <StatusView
        status={searchStatus}
        message={searchErrorMessage || MESSAGES.loading}
        onRetry={retrySearch}
        onBack={clearSearch}
      />
    );
  } else if (showListStatus) {
    mainContent = (
      <StatusView
        status={listStatus === STATUS.IDLE ? STATUS.LOADING : listStatus}
        message={listErrorMessage || MESSAGES.loading}
        onRetry={retryList}
      />
    );
  } else {
    mainContent = (
      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + spacing.md },
      ]}
    >
      <View style={styles.top}>
        <Header title="PokéDex Explorer" />
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSearch={search}
        />
      </View>
      {mainContent}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerError: {
    ...typography.secondary,
    textAlign: 'center',
  },
  footerButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  footerButtonText: {
    ...typography.secondary,
    color: colors.surface,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
