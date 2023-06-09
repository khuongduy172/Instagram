import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_GPT_API_KEY, REACT_APP_GPT_API_URL } from '@env';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useCustomTheme from '../theme/CustomTheme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Message: { user: any };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Message'>;

const MessageScreen = ({ route, navigation }: Props) => {
  const { name, accountName, followers, follow, following, post, image } =
    route.params.user;
  console.log(route.params.user);
  const theme = useCustomTheme();
  const [data, setData] = useState([]);
  const apiKey = REACT_APP_GPT_API_KEY;
  const apiUrl = REACT_APP_GPT_API_URL;
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
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
      ...data,
      { type: 'user', text: textInput },
      { type: 'bot', text: text },
    ]);
    setTextInput('');
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '85%',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={image}
              style={{ width: 25, height: 25, borderRadius: 100 }}
            />

            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 15,
              }}>
              <Text
                style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                {accountName}
              </Text>
              <Text style={{ fontSize: 13, opacity: 0.8 }}>
                Active 2 hours ago
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather
              name="phone"
              color="black"
              size={25}
              style={{ paddingHorizontal: 20 }}
            />
            <Feather
              name="video"
              color="black"
              size={25}
              style={{ paddingHorizontal: 10 }}
            />
          </View>
        </View>
      </View>

      {/* <ScrollView style={{paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 15,
                  textAlign: 'center',
                  fontSize: 17,
                }}>
                {accountName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black'}}>{name}</Text>
                <Entypo name="dot-single" size={10} color="black" />
                <Text style={{color: 'black'}}>Instagram</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 15, opacity: 0.8}}>
                  {followers} followers
                </Text>
                <Entypo name="dot-single" size={10} />
                <Text style={{fontSize: 15, opacity: 0.8}}>{post} posts</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#efefef',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginVertical: 10,
                }}
                onPress={() =>
                  navigation.push('FriendProfile', {
                    name: name,
                    profileImage: image,
                    follow: follow,
                    post: post,
                    followers: followers,
                    following: following,
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                  }}>
                  View profile page
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView> */}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 30,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor:
                  item.type === 'user' ? '#3493d9' : theme.buttonColor,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{ color: item.type === 'user' ? 'white' : 'black' }}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 100,
              bottom: 0,
              marginBottom: 30,
              marginTop: 10,
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
                style={{ width: '55%' }}
                value={textInput}
                onChangeText={text => setTextInput(text)}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={handleSend}>
                <Feather
                  name="send"
                  size={25}
                  color="black"
                  style={{ paddingHorizontal: 10 }}
                />
              </TouchableOpacity>

              {/* <Feather
              name="mic"
              size={25}
              color="black"
              style={{paddingHorizontal: 10}}
            /> */}
              <Feather name="image" size={25} color="black" />
              <MaterialCommunityIcons
                name="sticker-emoji"
                size={25}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default MessageScreen;
