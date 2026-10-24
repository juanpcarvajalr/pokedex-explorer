// Punto de entrada: safe area, contenedor de navegación con tema y stack principal
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PokemonStack from './src/navigation/PokemonStack';
import { colors } from './src/theme';

// Spread: se parte del tema por defecto y solo se cambian los colores
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <PokemonStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
