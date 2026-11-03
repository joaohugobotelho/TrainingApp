import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TemaProvider, useTema } from '../temas/TemaContext';

function Navegacao() {
  const { modo } = useTema();

  return (
    <ThemeProvider
      value={modo === 'escuro' ? DarkTheme : DefaultTheme}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="fichario" />
      </Stack>

      <StatusBar style={modo === 'escuro' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <TemaProvider>
      <Navegacao />
    </TemaProvider>
  );
}