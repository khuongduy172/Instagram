import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Avatar = ({ uri, style, userId, disabled = false }: any) => {
  const navigation = useNavigation();
  const navigateToProfile = () => {
    if (userId) {
      navigation.push('ClientProfile', { userId: userId });
    }
  };
  return (
    <TouchableOpacity onPress={navigateToProfile} disabled={disabled}>
      <Image
        source={{
          uri: uri
            ? uri
            : 'https://cdn-icons-png.flaticon.com/512/860/860733.png',
        }}
        style={style}
      />
    </TouchableOpacity>
  );
};

export default Avatar;
