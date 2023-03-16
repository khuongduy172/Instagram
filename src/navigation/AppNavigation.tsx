import React from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native';
import TabNavigation from './TabNavigation';

const AppNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TabNavigation/>
    </NavigationContainer>
  )
}

export default AppNavigation