import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';
import { useInfiniteQuery } from 'react-query';
import { getNoti } from '../apis/notificationApi';
import NotificationItem from '../components/NotificationItem';
import PushNotification from 'react-native-push-notification';

const ActivityScreen = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const isFocused = useIsFocused();
  const [pageData, setPageData] = useState([]);

  const {
    fetchNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    `notification`,
    ({ pageParam = 1 }) => getNoti(pageParam),
    {
      getNextPageParam: (lastPage: any) =>
        lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
      onSuccess: data => {
        setPageData([...data.pages.flatMap(page => page.data)]);
      },
    },
  );
  useEffect(() => {
    PushNotification.cancelAllLocalNotifications();
  }, []);
  useEffect(() => {
    if (isFocused) {
      refetch().catch(err => console.error(err));
    }
  }, [isFocused]);
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
          Notification
        </Text>
      </View>
      {isLoading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={theme.text} size="large" />
        </View>
      ) : (
        <View style={{ padding: 15 }}>
          <Text style={{ fontWeight: 'bold', color: theme.text }}>Earlier</Text>
          <FlatList
            data={pageData}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                colors={['#000']}
                progressBackgroundColor="#ffffff"
              />
            }
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0}
            renderItem={({ item }) => {
              return <NotificationItem data={item} />;
            }}
          />
          {isFetchingNextPage && (
            <View
              style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={theme.text} size="small" />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ActivityScreen;
