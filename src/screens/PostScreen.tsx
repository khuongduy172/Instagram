import { View, Text } from 'react-native';
import React from 'react';
import { PostProps } from '../navigation/RootNavigationProps';

const PostScreen = ({ route, navigation }: PostProps) => {
  return (
    <View>
      <Text>PostScreen</Text>
    </View>
  );
};

export default PostScreen;
