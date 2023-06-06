import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ShareIcon from '../assets/images/instagram-share-icon.svg';
import moment from 'moment-timezone';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import useSignalR from '../hooks/useSignalR';
import { useInfiniteQuery, useMutation } from 'react-query';
import { getStatusCommentByPage, postComment } from '../apis/postApi';

const CommentScreen = ({ route, navigation }: any) => {
  const { avatar, username, createdAt, content, id }: any = route.params;
  const [caption, setCaption] = useState('');
  const [pageData, setPageData] = useState([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const theme = useCustomTheme();

  const connection = useSignalR();

  useEffect(() => {
    if (connection) {
      // Subscribe to a specific event
      connection.on('AddCommentAsync', data => {
        // Handle the event data
        setPageData(prevData => [data, ...prevData]);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      });
      console.log('join room: ', id);
      connection.invoke('JoinRoom', id).catch(err => console.error(err));

      // ...subscribe to other events or perform other SignalR operations
    }
  }, [connection]);

  const { mutate, isLoading } = useMutation(postComment);

  const createComment = () => {
    mutate({ content: caption, statusId: id });
    setCaption('');
    Keyboard.dismiss();
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, ...result } =
    useInfiniteQuery(
      `${id}-comments`,
      ({ pageParam = 1 }) => getStatusCommentByPage(pageParam, id),
      {
        getNextPageParam: lastPage =>
          lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
        onSuccess: data => {
          setPageData([...data.pages.flatMap(page => page.data)]);
        },
      },
    );

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
          Comments
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 25,
          }}>
          <ShareIcon width={25} height={25} fill={theme.text} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={event => {
          const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;

          // Calculate when to trigger the next page fetch
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;

          if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        scrollEventThrottle={400}>
        <View
          style={{
            flexDirection: 'column',
            padding: 15,
            marginTop: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              uri={avatar}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 13,
                marginTop: -7,
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
                style={{
                  fontSize: 15,
                  color: theme.text,
                  paddingVertical: 10,
                }}>
                {content}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#efefef',
            marginVertical: 3,
          }}
        />
        {pageData?.map((item: any) => (
          <Comment
            key={item.id}
            commentId={item.id}
            avatar={item.owner.avatar}
            username={item.owner.name}
            createdAt={item.createdAt}
            isOwner={item.isOwner}
            content={item.content}
            ownerId={item.ownerId}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderTopColor: theme.borderColor,
        }}>
        <Avatar
          uri={avatar}
          style={{ width: 35, height: 35, borderRadius: 100 }}
        />
        <TextInput
          placeholder="Add a comment..."
          style={{
            paddingHorizontal: 30,
            color: theme.text,
            width: '85%',
          }}
          onChangeText={text => setCaption(text)}
          value={caption}
        />
        <TouchableOpacity
          onPress={createComment}
          disabled={isLoading}
          style={{
            position: 'absolute',
            right: 25,
          }}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.text} />
          ) : (
            <ShareIcon width={20} height={20} fill={theme.text} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentScreen;
