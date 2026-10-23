// Componente reutilizable: tarjeta de la cuadrícula (imagen, número y nombre)
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../theme';
import { capitalize, formatPokemonNumber } from '../utils/formatters';

function PokemonCard({ pokemon, onPress }) {
  const numberLabel = formatPokemonNumber(pokemon.id);
  const nameLabel = capitalize(pokemon.name);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(pokemon)}
      style={({ pressed }) => [styles.card, shadow, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.number}>{numberLabel}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {nameLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '50%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    margin: spacing.xs,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  image: {
    width: 88,
    height: 88,
  },
  number: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.secondary,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default React.memo(PokemonCard);
