// Componente reutilizable: renderizado condicional de loading, error y sin resultados
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MESSAGES } from '../constants/messages';
import { STATUS } from '../constants/status';
import { colors, radius, spacing, typography } from '../theme';

export default function StatusView({
  status,
  title,
  message,
  onRetry,
  onBack,
}) {
  if (status === STATUS.LOADING) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>{message || MESSAGES.loading}</Text>
      </View>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="cloud-offline-outline"
            size={32}
            color={colors.primary}
          />
        </View>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.message}>{message || MESSAGES.error}</Text>
        {onRetry ? (
          <Pressable
            accessibilityRole="button"
            onPress={onRetry}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>{MESSAGES.retry}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  if (status === STATUS.EMPTY) {
    return (
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons name="search-outline" size={32} color={colors.primary} />
        </View>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.message}>{message}</Text>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>{MESSAGES.backToList}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.md,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.subtitle,
    textAlign: 'center',
  },
  message: {
    ...typography.secondary,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
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
