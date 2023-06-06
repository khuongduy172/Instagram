import { View, Text, Image } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Avatar from './Avatar';

const ProfileIntro = ({
  profileImage,
  posts,
  followers,
  following,
  name,
  status,
}: any) => {
  const theme = useCustomTheme();
  return (
    <View>
      <View
        style={{
          paddingTop: 25,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Avatar
            uri={profileImage}
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{ color: theme.text, fontWeight: 'bold', fontSize: 18 }}>
              {posts}
            </Text>
            <Text>Posts</Text>
          </View>
          <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
            <Text
              style={{ color: theme.text, fontWeight: 'bold', fontSize: 18 }}>
              {followers}
            </Text>
            <Text>Followers</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{ color: theme.text, fontWeight: 'bold', fontSize: 18 }}>
              {following}
            </Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: theme.text,
          fontWeight: 'bold',
          paddingVertical: 5,
        }}>
        {name}
      </Text>
      <Text
        style={{
          color: theme.text,
        }}>
        {status}
      </Text>
    </View>
  );
};

export default ProfileIntro;
