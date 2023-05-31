import { Image } from 'react-native';
import React from 'react';

const Avatar = ({ uri, style }: any) => {
  return (
    <Image
      source={{
        uri: uri
          ? uri
          : 'https://cdn-icons-png.flaticon.com/512/860/860733.png',
      }}
      style={style}
    />
  );
};

export default Avatar;
