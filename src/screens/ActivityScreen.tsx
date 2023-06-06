import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';

const friendsProfileData = [
  {
    name: 'sontungmtp',
    accountName: 'Sơn Tùng M-TP',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mono.hng',
    accountName: 'Mono',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mia.soya',
    accountName: 'Nguyen Lam Thao Tam',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'khanhvyccf',
    accountName: 'Khánh Vy',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'sontungmtp',
    accountName: 'Sơn Tùng M-TP',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mono.hng',
    accountName: 'Mono',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mia.soya',
    accountName: 'Nguyen Lam Thao Tam',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'khanhvyccf',
    accountName: 'Khánh Vy',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  ,
  {
    name: 'sontungmtp',
    accountName: 'Sơn Tùng M-TP',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mono.hng',
    accountName: 'Mono',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'mia.soya',
    accountName: 'Nguyen Lam Thao Tam',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
  {
    name: 'khanhvyccf',
    accountName: 'Khánh Vy',
    profileImage:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    posts: 56,
    followers: 6542,
    following: 43,
    follow: false,
    status: 'Hello World',
  },
];

const ActivityScreen = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
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
          Notification
        </Text>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontWeight: 'bold', color: theme.text }}>Earlier</Text>
        {friendsProfileData.slice(3, 6).map((data, index) => {
          const [follow, setFollow] = useState(data.follow);
          return (
            <View key={index} style={{ width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 20,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('ClientProfile', {
                      name: data.name,
                      accountName: data.accountName,
                      profileImage: data.profileImage,
                      follow: data.follow,
                      post: data.posts,
                      followers: data.followers,
                      following: data.following,
                      status: data.status,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '63%',
                  }}>
                  <Image
                    source={{ uri: data.profileImage }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ fontSize: 14, color: theme.text }}>
                    <Text style={{ fontWeight: 'bold', color: theme.text }}>
                      {data.name}
                    </Text>
                    , who you might know, is on instagram
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFollow(!follow)}
                  style={{ width: follow ? 90 : 68 }}>
                  <View
                    style={{
                      width: '100%',
                      height: 30,
                      borderRadius: 5,
                      backgroundColor: follow ? null : '#3493D9',
                      borderWidth: follow ? 1 : 0,
                      borderColor: follow ? '#DEDEDE' : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: follow ? 'black' : 'white' }}>
                      {follow ? 'Following' : 'Follow'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <Text
          style={{
            fontWeight: 'bold',
            paddingVertical: 10,
            color: theme.text,
          }}>
          Suggestions for you
        </Text>
        {friendsProfileData.slice(6, 12).map((data, index) => {
          const [follow, setFollow] = useState(data.follow);
          const [close, setClose] = useState(false);
          return (
            <View key={index}>
              {close ? null : (
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push('ClientProfile', {
                          name: data.name,
                          profileImage: data.profileImage,
                          accountName: data.accountName,
                          follow: data.follow,
                          post: data.posts,
                          followers: data.followers,
                          following: data.following,
                          status: data.status,
                        })
                      }
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        maxWidth: '64%',
                      }}>
                      <Image
                        source={{ uri: data.profileImage }}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 100,
                          marginRight: 10,
                        }}
                      />
                      <View style={{ width: '100%' }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: theme.text,
                          }}>
                          {data.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            opacity: 0.5,
                            color: theme.text,
                          }}>
                          {data.accountName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            opacity: 0.5,
                            color: theme.text,
                          }}>
                          Suggested for you
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {follow ? (
                      <TouchableOpacity
                        onPress={() => setFollow(!follow)}
                        style={{ width: follow ? 90 : 68 }}>
                        <View
                          style={{
                            width: '100%',
                            height: 30,
                            borderRadius: 5,
                            backgroundColor: follow ? null : '#3493D9',
                            borderWidth: follow ? 1 : 0,
                            borderColor: follow ? '#DEDEDE' : null,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{ color: follow ? 'black' : 'white' }}>
                            {follow ? 'following' : 'follow'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => setFollow(!follow)}
                          style={{ width: follow ? 90 : 68 }}>
                          <View
                            style={{
                              width: '100%',
                              height: 30,
                              borderRadius: 5,
                              backgroundColor: follow ? null : '#3493D9',
                              borderWidth: follow ? 1 : 0,
                              borderColor: follow ? '#DEDEDE' : null,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{ color: follow ? 'black' : 'white' }}>
                              {follow ? 'Following' : 'Follow'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setClose(true)}
                          style={{ paddingHorizontal: 10 }}>
                          <AntDesign
                            name="close"
                            size={14}
                            color="black"
                            opacity={0.8}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
        <View style={{ padding: 15 }}>
          <Text style={{ color: '#3493d9' }}>See all suggestions</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
