import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import ProfileHeader from '../components/ProfileHeader';
import ProfileIntro from '../components/ProfileIntro';
import ProfileButton from '../components/ProfileButton';
import StoryHighlight from '../components/StoryHighlight';
import ProfileBottomTabView from '../components/ProfileBottomTabView';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';

interface ErrorMessage {
  message: string;
}

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(() => {
    refetch();
  });
};

const ProfileScreen = () => {
  const theme = useCustomTheme();

  const { data, isLoading, error, refetch } = useQuery<
    UserResponse,
    ErrorMessage
  >('userOwner', getUserOwner);
  useRefetchOnFocus(refetch);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      {data ? (
        <View style={{ padding: 15 }}>
          <ProfileHeader accountName={data.username} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileIntro
              name={data.name}
              profileImage={data.avatar}
              followers={data.followerCount}
              following={data.followingCount}
              posts={data.postCount}
              status={data.bio}
            />
            <ProfileButton
              owner={data.isOwner ? 0 : 1}
              name={data.name}
              accountName={data.username}
              profileImage={data.avatar}
              status={data.bio}
            />
            <StoryHighlight />
          </ScrollView>
        </View>
      ) : null}

      <ProfileBottomTabView />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
