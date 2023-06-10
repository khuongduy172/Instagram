import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getUserOwner, UserResponse } from '../apis/userApi';
import { useQuery } from 'react-query';
import useCustomTheme from '../theme/CustomTheme';
import Avatar from '../components/Avatar';

interface ErrorMessage {
  message: string;
}

const DirectMessage = () => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();

  const { data, isLoading, error } = useQuery<UserResponse, ErrorMessage>(
    'userOwner',
    getUserOwner,
  );
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const directInfo = [
    {
      id: 1,
      name: 'Your notes',
      image: data?.avatar,
    },
    {
      id: 0,
      name: 'ChatGPT',
      image: require('../assets/images/gpt.png'),
    },
  ];

  const handlePress = (item: any) => {
    if (item.name === 'Your notes') {
      return;
    }

    navigation.push('Message', { user: item });
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 20 }}>
      {directInfo.map(item => {
        return (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
            <View
              style={{
                position: 'relative',
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingTop: 10,
              }}>
              {item.name === 'Your notes' ? (
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
                {item.name === 'ChatGPT' ? (
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
                ) : (
                  <Avatar
                    uri={item.image}
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                      backgroundColor: 'orange',
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
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
