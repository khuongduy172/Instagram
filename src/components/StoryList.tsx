import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import StoryListItem from './StoryListItem';
import { useNavigation } from '@react-navigation/native';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserResponse, getUserOwner } from '../apis/userApi';
import { useQuery } from 'react-query';

interface IStoryListProps {
  data: any;
  isLoading: boolean;
}

const StoryList = ({ data, isLoading }: IStoryListProps) => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();
  const handlePress = () => {
    navigation.navigate('Camera');
  };
  const { data: user } = useQuery<UserResponse>('userOwner', getUserOwner);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      style={{ padding: 7 }}>
      <TouchableOpacity style={{ marginRight: 5 }} onPress={handlePress}>
        <View
          style={{
            width: 85,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                zIndex: 1,
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: theme.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign
                name="plus"
                style={{
                  fontSize: 17,
                  color: '#fff',
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                width: 85,
                height: 85,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                uri={user?.avatar}
                disabled={true}
                style={{ width: 70, height: 70, borderRadius: 100 }}
              />
            </View>
          </View>
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
              Your story
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {isLoading
        ? null
        : data.map((item: any) => (
            <StoryListItem key={item.user_id} data={item} storyList={data} />
          ))}
    </ScrollView>
  );
};

export default StoryList;
