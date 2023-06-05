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
import { getUserById, getUserOwner, UserResponse } from '../apis/userApi';
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

// export const useRefetchOnFocus = (refetch: () => void) => {
//   useFocusEffect(() => {
//     refetch();
//   });
// };

const ClientProfile = ({ route, navigation }: any) => {
  const {
    name,
    profileImage,
    accountName,
    post,
    followers,
    following,
    status,
    userId,
  } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useCustomTheme();

  const { data, isLoading, error, refetch } = useQuery<
    UserResponse,
    ErrorMessage
  >(`user-${userId}`, () => getUserById(userId));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(data)
  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={theme.backButton} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.text,
              paddingHorizontal: 30,
            }}>
            {data.name}
          </Text>
          <Feather
            name="more-vertical"
            style={{ fontSize: 20, flex: 1, textAlign: 'right' }}
            color={theme.text}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileIntro
            name={name}
            profileImage={profileImage}
            followers={followers}
            following={following}
            posts={post}
            status={status}
          />
          <ProfileButton
            owner={1}
            name={accountName}
            accountName={name}
            profileImage={profileImage}
            status={status}
          />
          <StoryHighlight />
        </ScrollView>
      </View>

      <ProfileBottomTabView />
    </View>
  );
};

export default ClientProfile;
