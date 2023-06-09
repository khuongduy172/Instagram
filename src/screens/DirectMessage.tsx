import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';

interface ErrorMessage {
  message: string;
}

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(() => {
    refetch();
  });
};

const DirectMessage = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();

  const { data, isLoading, error, refetch } = useQuery<
    UserResponse,
    ErrorMessage
  >('userOwner', getUserOwner);
  useRefetchOnFocus(refetch);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const directInfo = [
    {
      id: 1,
      name: 'Write notes',
      image: data?.avatar
        ? { uri: data.avatar }
        : require('../assets/images/gpt.png'),
      accountName: 'anthony.haidang',
    },
    {
      id: 0,
      name: 'chatgpt',
      image: require('../assets/images/gpt.png'),
      accountName: 'ChatGPT',
      followers: '14M',
      following: '425',
      post: '1,2k',
      follow: false,
    },
  ];
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 20 }}>
      {directInfo.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.push('Message', {
                accountName: item.accountName,
                followers: item.followers,
                following: item.following,
                post: item.post,
                name: item.name,
                image: item.image,
                follow: item.follow,
              })
            }>
            <View
              style={{
                position: 'relative',
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingTop: 10,
              }}>
              {item.id === 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    zIndex: 1,
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    backgroundColor: theme.backgroundButton,
                    borderColor: theme.borderColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="plus"
                    style={{
                      fontSize: 20,
                      color: theme.text,
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : null}
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  opacity: item.id === 0 ? 1 : 0.5,
                  paddingTop: 15,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DirectMessage;
