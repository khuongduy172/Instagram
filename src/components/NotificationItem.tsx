import { View, Text, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';

interface INotificationItemProps {
  data: any;
}

const FollowNoti = ({ data }: INotificationItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const navigateToProfile = () => {
    if (data.fromId) {
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
          width: '100%',
        }}>
        <TouchableOpacity
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
          <Text style={{ fontSize: 14, color: theme.text }}>
            <Text style={{ fontWeight: 'bold', color: theme.text }}>
              {data.fromUser.name}
            </Text>
            {` `}followed you.
          </Text>
          <Text style={{ color: theme.text, opacity: 0.5 }}>
            {' '}
            {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              View profile
            </Text>
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
    if (data.statusId) {
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
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={navigateToPost}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100%',
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
          <Text style={{ fontSize: 14, color: theme.text }}>
            <Text style={{ fontWeight: 'bold', color: theme.text }}>
              {data.fromUser.name}
            </Text>
            {` `}commented on your post.
          </Text>
          <Text style={{ color: theme.text, opacity: 0.5 }}>
            {' '}
            {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ReactNoti = ({ data }: INotificationItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
  const navigateToPost = () => {
    if (data.statusId) {
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
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={navigateToPost}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100%',
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
          <Text style={{ fontSize: 14, color: theme.text }}>
            <Text style={{ fontWeight: 'bold', color: theme.text }}>
              {data.fromUser.name}
            </Text>
            {` `}loved your post.
          </Text>
          <Text style={{ color: theme.text, opacity: 0.5 }}>
            {' '}
            {moment.utc(data.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
          </Text>
        </TouchableOpacity>
      </View>
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
