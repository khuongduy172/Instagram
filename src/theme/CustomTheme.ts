import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

const darkColor = {
  ...DarkTheme,
  borderColor: '#3b3b3b',
  backgroundColor: '#121212',
  backButton: '#fff',
  placeholderTextColor: '#a0a0a0',
};

const lightColor = {
  ...DefaultTheme,
  borderColor: '#e1e1e1',
  backgroundColor: '#fafafa',
  backButton: '#000',
  placeholderTextColor: '#c8c8c8',
};

const useCustomTheme = () => {
  const scheme = useColorScheme();

  return scheme === 'dark' ? darkColor : lightColor;
};

export default useCustomTheme;
