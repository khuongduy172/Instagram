import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import useCustomTheme from '../theme/CustomTheme';

const SearchBox = () => {
  const theme = useCustomTheme();
  return (
    <TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingVertical: 10,
          position: 'relative',
        }}>
        <Ionic
          name="search"
          style={{
            fontSize: 18,
            opacity: 0.7,
            position: 'absolute',
            zIndex: 1,
            left: 25,
          }}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.placeholderTextColor}
          editable={false}
          style={{
            width: '94%',
            backgroundColor: theme.backgroundColor,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            padding: 4,
            paddingLeft: 40,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBox;
