// Componente reutilizable: título de la pantalla principal
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.primary,
  },
});
