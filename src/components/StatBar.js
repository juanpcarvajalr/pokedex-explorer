// Componente reutilizable: barra proporcional de una estadística base
import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT } from '../constants/stats';
import { colors, radius, spacing, typography } from '../theme';

export default function StatBar({ label, value }) {
  const safeValue = Number(value) || 0;
  const percentage = Math.min(safeValue / MAX_STAT, 1) * 100;
  const barWidth = `${percentage}%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{safeValue}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.secondary,
    color: colors.text,
    fontWeight: '600',
  },
  value: {
    ...typography.secondary,
    fontWeight: '700',
  },
  track: {
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
});
