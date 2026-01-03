import { View } from 'react-native';

// Simple solid background for now, or could use BlurView if installed
export default function TabBarBackground() {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.9)' }} />
  );
}
