/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import * as RootNavigation from './src/navigation/RootNavigation';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    RootNavigation.navigate('Activity');
  },
});

AppRegistry.registerComponent(appName, () => App);
