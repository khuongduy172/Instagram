import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { PostProps } from '../navigation/RootNavigationProps';
import { useQuery } from 'react-query';
import { getStatusById } from '../apis/postApi';
import useCustomTheme from '../theme/CustomTheme';
import Post from '../components/Post';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostScreen = ({ route, navigation }: PostProps) => {
  const { postId } = route.params;
  const theme = useCustomTheme();
  const { data, isLoading, error } = useQuery(`status-${postId}`, () =>
    getStatusById(postId),
  );
  if (error) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={theme.backButton} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.text,
              paddingHorizontal: 30,
            }}>
            Post
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Text style={{ color: theme.text }}>
            This resource is unreachable!
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.backButton} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            paddingHorizontal: 30,
          }}>
          Post
        </Text>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      ) : (
        <Post item={data} />
      )}
    </View>
  );
};

export default PostScreen;
