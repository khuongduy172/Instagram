import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileHeader = ({ accountName, toggleModal, isClientUser }: any) => {
  const theme = useCustomTheme();
  const navigation: any = useNavigation();
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
        {isClientUser && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 10 }}>
            <AntDesign name="arrowleft" size={30} color={theme.backButton} />
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: 20, color: theme.text, fontWeight: 'bold' }}>
          {accountName}
        </Text>
        {accountName && (
          <EvilIcons name="chevron-down" size={25} color={theme.text} />
        )}
      </View>
      {!isClientUser && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Camera');
            }}>
            <FontAwesome name="plus-square-o" size={25} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <SimpleLineIcons
              name="menu"
              size={25}
              color={theme.text}
              style={{ paddingLeft: 25 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
