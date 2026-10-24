// Componente reutilizable: distintivo de tipo con color propio
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_TYPES, POKEMON_TYPES } from '../constants/pokemonTypes';
import { colors, radius, spacing, typography } from '../theme';
import { capitalize } from '../utils/formatters';

export default function TypeBadge({ type }) {
  // props: type llega desde la ficha de detalle
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

// StyleSheet: estilos fuera del JSX para no recrearlos en cada render
const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.label, // spread: reutiliza tipografía del theme
    fontWeight: '700',
  },
});
