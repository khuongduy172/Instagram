import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const darkColor = {
  ...DarkTheme,
  borderColor: '#3b3b3b',
  backgroundColor: '#121212',
  background: '#000000',
  backButton: '#fff',
  placeholderTextColor: '#a0a0a0',
  text: '#ffffff',
  buttonColor: '#000000',
  mainButtonColor: '#3493d9',
  disabledIcon: 'gray',
  storyBackground: '#000000',
};

const lightColor = {
  ...DefaultTheme,
  borderColor: '#e1e1e1',
  backgroundColor: '#fafafa',
  background: '#ffffff',
  backButton: '#000',
  placeholderTextColor: '#c8c8c8',
  text: '#000000',
  buttonColor: '#efefef',
  mainButtonColor: '#3493d9',
  disabledIcon: 'gray',
  storyBackground: '#000000',
};

const useCustomTheme = () => {
  const scheme = useColorScheme();

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useCustomTheme;
