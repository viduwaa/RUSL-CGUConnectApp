import * as Font from 'expo-font';

export const loadFonts = () => {
  return Font.loadAsync({
    SourceSans3Italic: require('@/assets/fonts/SourceSans3-Italic.ttf'),
    SourceSans3Medium: require('@/assets/fonts/SourceSans3-Regular.ttf'),
    SourceSans3MediumItalic: require('@/assets/fonts/SourceSans3-MediumItalic.ttf'),
    SourceSans3Thin: require('@/assets/fonts/SourceSans3-Light.ttf'),
    SourceSans3ThinItalic: require('@/assets/fonts/SourceSans3-LightItalic.ttf'),
    SourceSans3Bold: require('@/assets/fonts/SourceSans3-Bold.ttf'),
    
  });
};
