import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Avatar from './Avatar';
import moment from 'moment';
import { deleteComment } from '../apis/postApi';
import Feather from 'react-native-vector-icons/Feather';

const Comment = ({
  commentId,
  avatar,
  username,
  createdAt,
  isOwner,
  content,
  ownerId,
  refetch,
  isOpen,
  setIsOpen,
  selectedComment,
  setSelectedComment,
}: any) => {
  const theme = useCustomTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true);
      await deleteComment(commentId);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TouchableOpacity
      onLongPress={() => {
        if (isOwner) {
          setIsOpen(!isOpen);
          setSelectedComment(commentId);
        }
      }}>
      {isOpen && selectedComment === commentId ? (
        <View style={{ backgroundColor: '#e0f2ff' }}>
          <View style={{ flexDirection: 'row', padding: 15 }}>
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
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: theme.text,
                  }}>
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
              <Text
                style={{ fontSize: 15, color: theme.text, paddingVertical: 7 }}>
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
            {/* {isOwner && (
        <TouchableOpacity
          onPress={handleDeleteComment}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            marginTop: 10,
          }}>
          {isDeleting ? (
            <ActivityIndicator size="small" color={theme.text} />
          ) : (
            <Feather name="trash" size={15} color={theme.textSecond} />
          )}
        </TouchableOpacity>
      )} */}
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', padding: 15 }}>
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
            <Text
              style={{ fontSize: 15, color: theme.text, paddingVertical: 7 }}>
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
          {/* {isOwner && (
          <TouchableOpacity
            onPress={handleDeleteComment}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              right: 10,
              marginTop: 10,
            }}>
            {isDeleting ? (
              <ActivityIndicator size="small" color={theme.text} />
            ) : (
              <Feather name="trash" size={15} color={theme.textSecond} />
            )}
          </TouchableOpacity>
        )} */}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Comment;
