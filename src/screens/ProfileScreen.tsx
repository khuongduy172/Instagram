import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import ProfileHeader from '../components/ProfileHeader';
import ProfileIntro from '../components/ProfileIntro';
import ProfileButton from '../components/ProfileButton';
import StoryHighlight from '../components/StoryHighlight';
import ProfileBottomTabView from '../components/ProfileBottomTabView';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

interface ErrorMessage {
  message: string;
}

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(() => {
    refetch();
  });
};

const ProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useCustomTheme();
  const navigation: any = useNavigation();

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
          <ProfileHeader
            accountName={data.username}
            toggleModal={toggleModal}
          />
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
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        useNativeDriver={true}
        style={{ justifyContent: 'flex-end', margin: 0 }}>
        <TouchableOpacity
          onPressOut={toggleModal}
          activeOpacity={1}
          style={{ height: '100%' }}>
          <View
            style={{
              height: '72%',
              marginTop: 'auto',
              backgroundColor: theme.background,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 5,
                borderRadius: 20,
                backgroundColor: theme.textSecond,
                alignSelf: 'center',
                marginTop: 5,
              }}></View>
            <View style={{ padding: 20 }}>
              <TouchableOpacity onPress={() => navigation.push('Setting')}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 25,
                  }}>
                  <AntDesign name="setting" color={theme.text} size={25} />
                  <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                    Settings
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <Entypo name="back-in-time" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Your Activities
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <Entypo name="archive" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Archives
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  color={theme.text}
                  size={25}
                />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  QR Code
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <Feather name="bookmark" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Saved
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <FontAwesome name="credit-card" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Orders and Payments
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <Octicons name="shield-check" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Digital items
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <MaterialCommunityIcons
                  name="playlist-star"
                  color={theme.text}
                  size={25}
                />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Best friend
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <Feather name="star" color={theme.text} size={25} />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Favourite
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 25,
                }}>
                <FontAwesome5Brands
                  name="facebook-messenger"
                  color={theme.text}
                  size={25}
                />
                <Text style={{ paddingHorizontal: 15, color: theme.text }}>
                  Update messaging feature
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
