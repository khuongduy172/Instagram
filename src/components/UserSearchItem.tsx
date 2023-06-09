import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SearchUserResponse } from '../apis/userApi';
import Avatar from './Avatar';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';

interface IUserSearchItemProps {
  data: SearchUserResponse;
  routeName?: string;
}

const UserSearchItem = ({ data, routeName }: IUserSearchItemProps) => {
  const theme = useCustomTheme();
  const navigation = useNavigation();

  const onPress = () => {
    if (routeName && routeName == 'SearchToSendMessage') {
      navigation.navigate('Message', { user: data });
    }

    if (routeName && routeName == 'SearchMain') {
      navigation.push('ClientProfile', { userId: data.id });
    }
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
            uri={data.avatar}
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
            {data.name}
          </Text>
          <Text style={{ marginTop: 1, color: theme.placeholderTextColor }}>
            {data.username}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserSearchItem;
