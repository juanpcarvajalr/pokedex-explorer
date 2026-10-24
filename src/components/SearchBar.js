// Componente reutilizable: TextInput controlado + botón Buscar (solo props)
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export default function SearchBar({ value, onChangeText, onSearch }) {
  // props: el estado del texto vive en el padre (HomeScreen / hook)
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textMuted}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Busca por nombre o número..."
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={onSearch} // tecla "Enter" del teclado
        />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onSearch}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} // Pressable pressed
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

// StyleSheet: tipografía y colores salen del theme
const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    ...typography.body,
    flex: 1,
    paddingVertical: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  buttonText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '700',
  },
});
