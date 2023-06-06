import { View, Text } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Avatar from './Avatar';
import moment from 'moment';

const Comment = ({
  commentId,
  avatar,
  username,
  createdAt,
  isOwner,
  content,
  ownerId,
}: any) => {
  const theme = useCustomTheme();
  return (
    <View style={{ padding: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          uri={avatar}
          userId={ownerId}
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
              {username}
            </Text>
            <Text
              style={{
                fontSize: 13,
                paddingHorizontal: 10,
                color: theme.textSecond,
                fontWeight: 'bold',
              }}>
              {moment.utc(createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
            </Text>
          </View>
          <Text style={{ fontSize: 15, color: theme.text, paddingVertical: 7 }}>
            {content}
          </Text>
          {/* <Text
            style={{
              fontSize: 13,
              color: theme.textSecond,
              fontWeight: 'bold',
            }}>
            Reply
          </Text> */}
        </View>
        {/* DELETE COMMENT HERE */}
        {/* <View
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
        </View> */}
      </View>
    </View>
  );
};

export default Comment;
