import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
interface IUserMessageItemProps {
  data: any;
}
const UserMessageItem = ({ data }: IUserMessageItemProps) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();

  const currentUserId = useSelector(
    (state: any) => state.currentUser.currentUserId,
  );

  const onPress = () => {
    const result =
      currentUserId == data.receiverId
        ? {
            id: data.senderId,
            name: data.sender.name,
            image: data.sender.avatar,
          }
        : {
            id: data.receiverId,
            name: data.receiver.name,
            image: data.receiver.avatar,
          };

    navigation.push('Message', { user: result });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <View style={{ padding: 5 }}>
          <Avatar
            uri={
              currentUserId == data.receiverId
                ? data.sender.avatar
                : data.receiver.avatar
            }
            disabled={true}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 7,
          }}>
          <Text
            style={{
              marginBottom: 1,
              fontWeight: 'bold',
              color: theme.text,
              fontSize: 18,
            }}>
            {currentUserId == data.receiverId
              ? data.sender.name
              : data.receiver.name}
          </Text>
          <Text style={{ marginTop: 1, color: theme.placeholderTextColor }}>
            {currentUserId == data.receiverId
              ? data.content
              : `You: ${data.content}`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserMessageItem;
