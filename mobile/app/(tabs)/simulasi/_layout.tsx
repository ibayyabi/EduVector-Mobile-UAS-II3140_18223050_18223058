import { Stack } from 'expo-router';

export default function SimulasiLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="vektor-kartesius" />
      <Stack.Screen name="palet-rgb" />
      <Stack.Screen name="proyektor-vektor" />
    </Stack>
  );
}
