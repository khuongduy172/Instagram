import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_GPT_API_KEY, REACT_APP_GPT_API_URL } from '@env';
import useCustomTheme from '../theme/CustomTheme';
import { MessageProps } from '../navigation/RootNavigationProps';
import Avatar from '../components/Avatar';
import useSignalR from '../hooks/useSignalR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HubConnection } from '@microsoft/signalr';
import { useInfiniteQuery, useMutation } from 'react-query';
import { getMessages, sendMessage } from '../apis/messageApi';

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { id, name, image } = route.params.user;
  const theme = useCustomTheme();
  const [data, setData] = useState<any>([]);
  const apiKey = REACT_APP_GPT_API_KEY;
  const apiUrl = REACT_APP_GPT_API_URL;
  const [textInput, setTextInput] = useState('');

  const connection = useSignalR();

  const { mutate } = useMutation(sendMessage);

  const joinRoom = async (connection: HubConnection) => {
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    console.log('join room: ', `${id}-${currentUserId}`);
    connection
      .invoke('JoinRoom', `${id}-${currentUserId}`)
      .catch(err => console.error(err));
    return currentUserId;
  };

  useEffect(() => {
    if (connection) {
      // Subscribe to a specific event
      connection.on('RecieveMessage', data => {
        // Handle the event data
        setData((prevData: any) => [data, ...prevData]);
      });

      joinRoom(connection).catch((err: any) => console.log(err));
    }
  }, [connection]);

  const handleSend = async () => {
    if (textInput === '' || textInput.trim() === '') {
      setTextInput('');
      return;
    }

    if (name === 'ChatGPT') {
      const prompt = `\n\n  Q:${textInput}\nA:`;
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const text = response.data.choices[0].text;

      setData([
        { senderId: id, receiverId: 'user', content: text },
        { senderId: 'user', receiverId: id, content: textInput },
        ...data,
      ]);
    } else {
      //handle user chat
      const body = new FormData();

      body.append('ReceiverId', id);
      body.append('Content', textInput);

      mutate(body);
    }

    setTextInput('');
  };

  const { fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    `${id}-message`,
    ({ pageParam = 1 }) => getMessages(pageParam, id),
    {
      getNextPageParam: (lastPage: any) =>
        lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
      onSuccess: data => {
        setData([...data.pages.flatMap(page => page.data)]);
      },
    },
  );

  return (
    <View
      style={{
        backgroundColor: theme.background,
        width: '100%',
        height: '100%',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: theme.background,
        }}>
        <TouchableOpacity
          onPress={() => {
            const routes = navigation.getState()?.routes;
            const prevRoute: any = routes[routes.length - 2];
            if (prevRoute.name == 'SearchToSendMessage') {
              navigation.pop();
            }
            navigation.goBack();
          }}>
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
            {name === 'ChatGPT' ? (
              <Image
                source={image}
                style={{ width: 30, height: 30, borderRadius: 100 }}
              />
            ) : (
              <Avatar
                uri={image}
                style={{ width: 30, height: 30, borderRadius: 100 }}
                userId={id}
                disabled={true}
              />
            )}

            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 15,
              }}>
              <Text
                style={{ color: theme.text, fontSize: 15, fontWeight: 'bold' }}>
                {name}
              </Text>
              <Text style={{ fontSize: 13, opacity: 0.8 }}>
                Active 2 hours ago
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather
              name="phone"
              color={theme.text}
              size={25}
              style={{ paddingHorizontal: 20 }}
            />
            <Feather
              name="video"
              color={theme.text}
              size={25}
              style={{ paddingHorizontal: 10 }}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={data}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          fetchNextPage().catch(err => console.log(err));
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingNextPage}
            colors={[theme.text]}
            progressBackgroundColor={theme.background}
          />
        }
        onEndReachedThreshold={0}
        keyExtractor={(item, index) => index.toString()}
        style={{
          width: '100%',
          padding: 10,
          marginTop: 10,
        }}
        inverted
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: item.senderId === id ? 'flex-start' : 'flex-end',
              marginVertical: 5,
            }}>
            {item.senderId === id &&
              (name === 'ChatGPT' ? (
                <Image
                  source={image}
                  style={{ width: 30, height: 30, borderRadius: 100 }}
                />
              ) : (
                <Avatar
                  uri={image}
                  style={{ width: 30, height: 30, borderRadius: 100 }}
                  userId={id}
                  disabled={true}
                />
              ))}
            <View
              style={{
                backgroundColor:
                  item.senderId === id
                    ? theme.backgroundColor
                    : theme.colors.primary,
                padding: 10,
                borderRadius: 14,
                marginLeft: 5,
              }}>
              <Text style={{ color: 'white' }}>{item.content}</Text>
            </View>
          </View>
        )}
      />
      <View
        style={{
          backgroundColor: theme.backgroundColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
          borderWidth: 1,
          borderRadius: 100,
          bottom: 0,
          marginVertical: 10,
          marginHorizontal: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: '#3493d9',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="camera" size={20} color="white" />
          </View>
          <TextInput
            placeholder="Send message..."
            style={{ width: '75%', marginLeft: 5, fontSize: 16 }}
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={handleSend}>
              <Feather
                name="send"
                size={25}
                color={theme.text}
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageScreen;
