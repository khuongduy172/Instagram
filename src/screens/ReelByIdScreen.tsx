import { View, Text } from 'react-native';
import React from 'react';
import { ReelByIdProps } from '../navigation/RootNavigationProps';

const ReelByIdScreen = ({ route, navigation }: ReelByIdProps) => {
  console.log('first', route.params.reel);
  return (
    <View>
      <Text>ReelByIdScreen</Text>
    </View>
  );
};

export default ReelByIdScreen;
