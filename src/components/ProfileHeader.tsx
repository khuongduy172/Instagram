import { View, Text } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useCustomTheme from '../theme/CustomTheme';

const ProfileHeader = ({ accountName }: any) => {
  const theme = useCustomTheme();
  return (
    <View
      style={{
        width: '100%',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: theme.text, fontWeight: 'bold' }}>
          {accountName}
        </Text>
        <EvilIcons name="chevron-down" size={25} color={theme.text} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name="plus-square-o" size={25} color={theme.text} />
        <SimpleLineIcons
          name="menu"
          size={25}
          color={theme.text}
          style={{ paddingLeft: 25 }}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
