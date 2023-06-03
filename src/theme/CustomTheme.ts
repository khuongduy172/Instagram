import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const darkColor = {
  ...DarkTheme,
  borderColor: '#3b3b3b',
  backgroundColor: '#121212',
  background: '#000000',
  backButton: '#fff',
  placeholderTextColor: '#a0a0a0',
  textInputBackground: '#121212',
  text: '#ffffff',
  buttonColor: '#000000',
  mainButtonColor: '#3493d9',
  disabledIcon: 'gray',
  storyBackground: '#000000',
  textSecond: '#ffffff',
  backgroundButton: '#404040',
  isDark: true,
};

const lightColor = {
  ...DefaultTheme,
  borderColor: '#e1e1e1',
  backgroundColor: '#fafafa',
  background: '#ffffff',
  backButton: '#000',
  placeholderTextColor: '#c8c8c8',
  textInputBackground: '#fafafa',
  text: '#000000',
  buttonColor: '#efefef',
  mainButtonColor: '#3493d9',
  disabledIcon: 'gray',
  storyBackground: '#000000',
  textSecond: '#a0a0a0',
  backgroundButton: '#808080',
  isDark: false,
};

const useCustomTheme = () => {
  const scheme = useColorScheme();

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useCustomTheme;
