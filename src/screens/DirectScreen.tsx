import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import DirectMessage from './DirectMessage';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import useCustomTheme from '../theme/CustomTheme';
import { getUserMessageList } from '../apis/messageApi';
import UserMessageItem from '../components/UserMessageItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ErrorMessage {
  message: string;
}

const DirectScreen = () => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();
  const { data, isLoading, error } = useQuery<UserResponse, ErrorMessage>(
    'userOwner',
    getUserOwner,
  );

  const { data: listMessage, isLoading: listMessageLoading }: any = useQuery(
    'list-message',
    getUserMessageList,
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: false,
    },
  );

  const { data: currentUserId } = useQuery(
    'currentUserId',
    async () => {
      return await AsyncStorage.getItem('currentUserId');
    },
    { initialData: '' },
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View
      style={{
        backgroundColor: theme.background,
        width: '100%',
        height: '100%',
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.text} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '85%',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                fontWeight: 'bold',
                color: theme.text,
              }}>
              {data?.username}
            </Text>
            <Feather
              name="chevron-down"
              color={theme.text}
              size={20}
              style={{
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather
              name="video"
              color={theme.text}
              size={30}
              style={{ paddingHorizontal: 20 }}
            />
            <TouchableOpacity
              onPress={() => navigation.push('SearchToSendMessage')}>
              <AntDesign name="plus" color={theme.text} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.push('SearchToSendMessage')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.textInputBackground,
            marginTop: 30,
            borderRadius: 10,
          }}>
          <AntDesign
            name="search1"
            color={theme.text}
            size={15}
            style={{ paddingHorizontal: 20 }}
          />
          <TextInput
            placeholder="Search"
            editable={false}
            placeholderTextColor={theme.placeholderTextColor}
            style={{
              flex: 1,
              backgroundColor: theme.textInputBackground,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              color: 'black',
              fontSize: 18,
              paddingTop: 5,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 0,
            }}
          />
        </View>
      </TouchableOpacity>
      <View>
        <DirectMessage data={data} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme.text,
              fontWeight: 'bold',
              fontSize: 15,
              marginLeft: 5,
            }}>
            Messages
          </Text>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary, fontSize: 15 }}>
              Message Requests
            </Text>
          </TouchableOpacity>
        </View>
        {listMessage && currentUserId ? (
          <FlatList
            data={listMessage}
            renderItem={({ item }) => (
              <UserMessageItem data={item} currentUserId={currentUserId} />
            )}
          />
        ) : (
          listMessage?.length === 0 &&
          !listMessageLoading && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingVertical: 50,
              }}>
              <Text
                style={{
                  color: theme.text,
                  fontSize: 20,
                  paddingVertical: 10,
                  textAlign: 'center',
                }}>
                Message your friends with Direct
              </Text>
              <Text style={{ textAlign: 'center' }}>
                Private message or directly share favorite articles with friends
              </Text>
              <TouchableOpacity
                onPress={() => navigation.push('SearchToSendMessage')}>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingVertical: 10,
                  }}>
                  Send Message
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default DirectScreen;
