// Componente reutilizable: distintivo de tipo con color propio
import { StyleSheet, Text, View } from 'react-native';
import { POKEMON_TYPES } from '../constants/pokemonTypes';
import { colors, radius, spacing, typography } from '../theme';
import { capitalize } from '../utils/formatters';

const LIGHT_TYPES = new Set([
  'electric',
  'ice',
  'steel',
  'ground',
  'fairy',
  'normal',
  'bug',
]);

export default function TypeBadge({ type }) {
  const typeInfo = POKEMON_TYPES[type] ?? {
    label: capitalize(type),
    color: colors.textMuted,
  };
  const textColor = LIGHT_TYPES.has(type) ? colors.text : colors.surface;

  return (
    <View style={[styles.badge, { backgroundColor: typeInfo.color }]}>
      <Text style={[styles.label, { color: textColor }]}>{typeInfo.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.label,
    fontWeight: '700',
  },
});
