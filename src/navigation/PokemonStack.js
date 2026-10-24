// Navegación tipo stack: lista (Home) y ficha de detalle (PokemonDetail)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

export default function PokemonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // HomeScreen dibuja su propio Header con safe area
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: 'Detalle', headerBackTitle: 'Atrás' }}
      />
    </Stack.Navigator>
  );
}
