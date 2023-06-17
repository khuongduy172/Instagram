import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';
import LinearGradient from 'react-native-linear-gradient';

interface IStoryListItemProps {
  data: any;
  storyList: any;
}

const StoryListItem = ({ data, storyList }: IStoryListItemProps) => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();
  const handlePress = () => {
    navigation.navigate('StoryScreen', { data, storyList });
  };
  return (
    <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={handlePress}>
      <View
        style={{
          width: 85,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          colors={['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 85,
            height: 85,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.backgroundColor,
            }}>
            <Avatar
              uri={data?.user_image}
              disabled={true}
              style={{ width: 70, height: 70, borderRadius: 100 }}
            />
          </View>
        </LinearGradient>
        <View style={{ width: '100%' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              width: '100%',
              fontSize: 12,
              marginTop: 2,
              color: theme.text,
              textAlignVertical: 'center',
              textAlign: 'center',
            }}>
            {data?.user_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoryListItem;
