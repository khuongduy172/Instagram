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
  const { data, isLoading } = useQuery(`status-${postId}`, () =>
    getStatusById(postId),
  );
  return (
    <View>
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
