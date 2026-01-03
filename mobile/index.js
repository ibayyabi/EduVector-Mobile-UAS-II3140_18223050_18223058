import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './app/_layout';

// On web, load Skia first before registering the app
if (Platform.OS === 'web') {
  import('@shopify/react-native-skia/lib/module/web').then(({ LoadSkiaWeb }) => {
    LoadSkiaWeb({
      locateFile: (file: string) => `/${file}`,
    }).then(() => {
      registerRootComponent(App);
    });
  });
} else {
  registerRootComponent(App);
}
