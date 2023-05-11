import { View, Text } from 'react-native';
import React from 'react';

const EditorScreen = ({ route, navigation }) => {
  const { newImageArray } = route.params;
  console.log('newImageArray', newImageArray);
  return (
    <View>
      <Text>EditorScreen</Text>
    </View>
  );
};

export default EditorScreen;
