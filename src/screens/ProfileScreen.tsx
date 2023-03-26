import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import ProfileHeader from '../components/ProfileHeader';
import ProfileIntro from '../components/ProfileIntro';
import ProfileButton from '../components/ProfileButton';
import StoryHighlight from '../components/StoryHighlight';
import ProfileBottomTabView from '../components/ProfileBottomTabView';

const ProfileScreen = () => {
  const theme = useCustomTheme();
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View style={{ padding: 15 }}>
        <ProfileHeader accountName="anthony.haidang" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileIntro
            name="Anthony Hai"
            profileImage={require('../assets/images/ava.png')}
            followers="3.6M"
            following="35"
            posts="458"
            status="My page"
          />
          <ProfileButton
            id={1}
            name="Anthony Hai"
            accountName="anthony.haidang"
            profileImage={require('../assets/images/ava.png')}
          />
          <StoryHighlight />
        </ScrollView>
      </View>
      <ProfileBottomTabView />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
