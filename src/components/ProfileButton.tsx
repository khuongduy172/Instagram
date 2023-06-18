import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postFollow, postUnFollow } from '../apis/followApi';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';

const ProfileButton = ({
  isOwner,
  userId,
  name,
  accountName,
  profileImage,
  status,
  followStatus,
  handleRefresh,
}: any) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const follow = () => {
    setIsLoading(true);
    postFollow({ userId: userId })
      .then(() => {
        handleRefresh();
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  const unFollow = () => {
    postUnFollow({ userId: userId })
      .then(() => {
        handleRefresh();
        toggleModal();
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={{ paddingVertical: 10 }}>
      {isOwner ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            style={{ width: '87%' }}
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
                status: status,
              })
            }>
            <View
              style={{
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  color: theme.text,
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '10%' }}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="person-add" size={15} color={theme.text} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          {(followStatus === 'None' || followStatus === 'FollowedBy') && (
            <TouchableOpacity
              style={{ width: '43%' }}
              onPress={follow}
              disabled={isLoading}>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  borderRadius: 7,
                  backgroundColor: theme.mainButtonColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  {followStatus === 'None' ? 'Follow' : 'Follow Back'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {followStatus === 'Following' && (
            <TouchableOpacity style={{ width: '43%' }} onPress={toggleModal}>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  borderRadius: 7,
                  backgroundColor: theme.borderColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: 'bold',
                  }}>
                  Following
                </Text>
                <EvilIcons
                  name="chevron-down"
                  size={18}
                  color={theme.text}
                  style={{ paddingBottom: 2 }}
                />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ width: '43%' }}
            onPress={() => {
              navigation.push('Message', {
                user: { id: userId, name: name, image: profileImage },
              });
            }}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  color: theme.text,
                }}>
                Send Message
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '10%' }}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="person-add" size={15} color={theme.text} />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        useNativeDriver={true}
        style={{
          justifyContent: 'flex-end',
          height: '100%',
          marginHorizontal: 0,
        }}>
        <TouchableOpacity style={{ height: '70%' }} onPressOut={toggleModal}>
          <View style={{ height: '100%', opacity: 0.1 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: '30%' }}>
          <View
            style={{
              height: '100%',
              marginTop: 'auto',
              backgroundColor: theme.backgroundColor,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 5,
                borderRadius: 20,
                backgroundColor: theme.text,
                alignSelf: 'center',
                marginTop: 10,
              }}></View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: theme.text }}>
                {accountName}
              </Text>
            </View>
            <View style={{ padding: 20 }}>
              <TouchableOpacity onPress={unFollow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 25,
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      color: theme.text,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Unfollow
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProfileButton;
