// Componente reutilizable: título de la pantalla principal
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export default function Header({ title }) {
  // props: title llega desde HomeScreen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

// StyleSheet: tipografía del theme con spread
const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.primary,
  },
});
