// Pantalla de detalle: ficha con imagen, tipos, medidas y estadísticas base
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StatBar from '../components/StatBar';
import StatusView from '../components/StatusView';
import TypeBadge from '../components/TypeBadge';
import { MESSAGES } from '../constants/messages';
import { STAT_LABELS } from '../constants/stats';
import { STATUS } from '../constants/status';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { colors, radius, shadow, spacing, typography } from '../theme';
import { capitalize, formatPokemonNumber } from '../utils/formatters';

export default function PokemonDetailScreen({ route, navigation }) {
  const { nameOrId } = route.params; // navegación: parámetro enviado desde HomeScreen
  const { status, pokemon, errorMessage, retry } = usePokemonDetail(nameOrId);

  const handleBack = () => navigation.goBack();

  // Renderizado condicional: solo se muestra la ficha cuando el status es success
  if (status !== STATUS.SUCCESS || !pokemon) {
    return (
      <View style={styles.screen}>
        <StatusView
          status={status === STATUS.IDLE ? STATUS.LOADING : status}
          message={errorMessage || MESSAGES.loading}
          onRetry={retry}
          onBack={handleBack}
        />
      </View>
    );
  }

  const numberLabel = formatPokemonNumber(pokemon.id);
  const nameLabel = capitalize(pokemon.name);
  const heightLabel = `${pokemon.heightM.toFixed(1)} m`;
  const weightLabel = `${pokemon.weightKg.toFixed(1)} kg`;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageWrap}>
        {/* Image remota: width y height explícitos; el fondo suaviza la carga */}
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.card, shadow]}>
        <Text style={styles.number}>{numberLabel}</Text>
        <Text style={styles.name}>{nameLabel}</Text>
        <View style={styles.typesRow}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </View>

      <View style={[styles.card, styles.dataRow, shadow]}>
        <View style={styles.dataItem}>
          <Ionicons name="resize-outline" size={22} color={colors.primary} />
          <Text style={styles.dataValue}>{heightLabel}</Text>
          <Text style={styles.dataLabel}>Altura</Text>
        </View>
        <View style={styles.dataDivider} />
        <View style={styles.dataItem}>
          <Ionicons name="barbell-outline" size={22} color={colors.primary} />
          <Text style={styles.dataValue}>{weightLabel}</Text>
          <Text style={styles.dataLabel}>Peso</Text>
        </View>
      </View>

      <View style={[styles.card, shadow]}>
        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.name}
            label={STAT_LABELS[stat.name] ?? capitalize(stat.name)}
            value={stat.value}
          />
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleBack}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} // Pressable: estilo al presionar
      >
        <Text style={styles.buttonText}>{MESSAGES.backToList}</Text>
      </Pressable>
    </ScrollView>
  );
}

// StyleSheet: bloques tipo DetalleClaseScreen con tokens del theme
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  imageWrap: {
    alignSelf: 'center',
    width: 240,
    height: 240,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  number: {
    ...typography.label, // spread: tipografía del theme
  },
  name: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  dataDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
  },
  dataValue: {
    ...typography.subtitle,
  },
  dataLabel: {
    ...typography.label,
  },
  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.md,
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
