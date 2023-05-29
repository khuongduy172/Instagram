import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CommentList = () => {
  const theme = useCustomTheme();
  return (
    <View style={{ padding: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
          style={{ width: 40, height: 40, borderRadius: 100, marginTop: 8 }}
        />
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 13,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ fontSize: 13, fontWeight: 'bold', color: theme.text }}>
              test
            </Text>
            <Text
              style={{
                fontSize: 13,
                paddingHorizontal: 10,
                color: theme.textSecond,
                fontWeight: 'bold',
              }}>
              4 hours ago
            </Text>
          </View>
          <Text style={{ fontSize: 15, color: theme.text, paddingVertical: 7 }}>
            Test content
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: theme.textSecond,
              fontWeight: 'bold',
            }}>
            Reply
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            marginTop: 10,
          }}>
          <AntDesign name="hearto" size={15} color={theme.textSecond} />
          <Text
            style={{
              color: theme.textSecond,
              fontWeight: 'bold',
              paddingVertical: 5,
            }}>
            2
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommentList;
