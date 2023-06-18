import { View, Text, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import { readNoti } from '../apis/notificationApi';

interface INotificationItemProps {
  data: any;
}

const FollowNoti = ({ data }: INotificationItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const navigateToProfile = () => {
    if (data.fromId) {
      if (!data.isRead) {
        readNoti(data.id).catch(err => console.error(err));
      }

      navigation.push('ClientProfile', { userId: data.fromId });
    }
  };
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 10,
          marginVertical: 10,
          width: '100%',
          backgroundColor: data.isRead
            ? theme.background
            : theme.notificationBackground,
        }}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '63%',
          }}>
          <Avatar
            uri={data.fromUser.avatar}
            disable={true}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              marginRight: 10,
            }}
          />

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', color: theme.text }}>
              {data.fromUser.name} {` `}
              <Text style={{ fontWeight: 'normal' }}>
                started following you
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text
                style={{ color: theme.text, opacity: 0.5, marginRight: 50 }}>
                {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
              </Text>
              <TouchableOpacity onPress={navigateToProfile}>
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    right: 0,
                  }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    View profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentNoti = ({ data }: INotificationItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const navigateToPost = () => {
    if (!data.isRead) {
      readNoti(data.id).catch(err => console.error(err));
    }

    if (data.statusId) {
      navigation.push('Post', { postId: data.statusId });
    }
  };
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={navigateToPost}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          marginVertical: 10,
          paddingHorizontal: 10,
          flexWrap: 'wrap',
          width: '100%',
          backgroundColor: data.isRead
            ? theme.background
            : theme.notificationBackground,
        }}>
        <Avatar
          uri={data.fromUser.avatar}
          disable={true}
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
            marginRight: 10,
          }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', color: theme.text }}>
            {data.fromUser.name} {` `}
            <Text style={{ fontWeight: 'normal' }}>
              commented on your post.
            </Text>
          </Text>
          <Text style={{ color: theme.text, opacity: 0.5, marginTop: 5 }}>
            {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ReactNoti = ({ data }: INotificationItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const navigateToPost = () => {
    if (!data.isRead) {
      readNoti(data.id).catch(err => console.error(err));
    }
    if (data.statusId) {
      navigation.push('Post', { postId: data.statusId });
    }
  };
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={navigateToPost}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          marginVertical: 10,
          paddingHorizontal: 10,
          flexWrap: 'wrap',
          width: '100%',
          backgroundColor: data.isRead
            ? theme.background
            : theme.notificationBackground,
        }}>
        <Avatar
          uri={data.fromUser.avatar}
          disable={true}
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
            marginRight: 10,
          }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: 'bold', color: theme.text }}>
            {data.fromUser.name} {` `}
            <Text style={{ fontWeight: 'normal' }}>loved your post.</Text>
          </Text>
          <Text style={{ color: theme.text, opacity: 0.5, marginTop: 5 }}>
            {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const NotificationItem = ({ data }: INotificationItemProps) => {
  switch (data.typeNoti) {
    case 'Follow':
      return <FollowNoti data={data} />;
    case 'Comment':
      return <CommentNoti data={data} />;
    case 'React':
      return <ReactNoti data={data} />;
    default:
      return null;
  }
};

export default NotificationItem;
