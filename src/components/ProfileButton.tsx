import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileButton = ({ id, name, accountName, profileImage }: any) => {
  const theme = useCustomTheme();
  const scheme = useColorScheme();
  const navigation: any = useNavigation();
  const [isFollow, setIsFollow] = useState(false);
  return (
    <View style={{ paddingVertical: 10 }}>
      {id === 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            style={{ width: '43%' }}
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  color: theme.text,
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '43%' }}
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  color: theme.text,
                }}>
                Share Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '10%' }}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="person-add" size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            style={{ width: '43%' }}
            onPress={() => setIsFollow(!isFollow)}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: isFollow
                  ? theme.buttonColor
                  : theme.mainButtonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {scheme === 'dark' ? (
                <Text
                  style={{
                    color: isFollow ? 'white' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {isFollow ? 'Following' : 'Follow'}
                </Text>
              ) : (
                <Text
                  style={{
                    color: isFollow ? 'black' : 'white',
                    fontWeight: 'bold',
                  }}>
                  {isFollow ? 'Following' : 'Follow'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '43%' }}
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 0.5,
                  color: theme.text,
                }}>
                Share Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '10%' }}>
            <View
              style={{
                width: '100%',
                height: 30,
                borderRadius: 7,
                backgroundColor: theme.buttonColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="person-add" size={15} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileButton;
