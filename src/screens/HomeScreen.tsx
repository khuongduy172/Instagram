import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  useColorScheme,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { getStatus } from '../apis/postApi';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Feather from 'react-native-vector-icons/Feather';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import useCustomTheme from '../theme/CustomTheme';
import Ionic from 'react-native-vector-icons/Ionicons';
import PostInterface from '../components/PostInterface';
import ShareIcon from '../assets/images/instagram-share-icon.svg';
import { getStory } from '../apis/storyApi';
import StoryList from '../components/StoryList';
import { HomeProps } from '../navigation/RootNavigationProps';

function HomeScreen({ route }: HomeProps): JSX.Element {
  const isRefresh = route?.params?.isRefresh;
  const isDarkMode = useColorScheme() === 'dark';
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && isRefresh) {
      handleRefresh();
    }
  }, [isFocused]);

  const theme = useCustomTheme();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
    width: '100%',
    height: '100%',
  };
  const scheme = useColorScheme();
  const instaLogo =
    scheme === 'dark'
      ? require('../assets/images/insta-dark.png')
      : require('../assets/images/insta.png');

  const _viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    await getStatus()
      .then(response => {
        setData(response);
        setRefreshing(false);
      })
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData().catch(error => console.error(error));
  }, []);

  const renderSpinner = () => {
    return <ActivityIndicator size="large" color={theme.textSecond} />;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setData([]);
    fetchData().catch(error => console.error(error));
    refetch().catch(error => console.error(error));
  };

  const [loading, setLoading] = useState(false);

  const fetchMoreData = async () => {
    if (!loading) {
      setLoading(true);
      await getStatus()
        .then(response => {
          setData(prevData => [...prevData, ...response]);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const {
    data: storyData,
    isLoading,
    isError,
    refetch,
  } = useQuery('story', getStory);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
          backgroundColor: theme.background,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image
              source={instaLogo}
              style={{
                width: 105,
                height: 60,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <Feather
            name="chevron-down"
            size={15}
            color={theme.text}
            style={{ paddingLeft: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <Ionic
              name="ios-heart-outline"
              style={{ fontSize: 24, paddingRight: 20 }}
              color={theme.text}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Direct')}>
            <ShareIcon width={20} height={20} fill={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{ backgroundColor: theme.background }}
        showsVerticalScrollIndicator={false}
        data={[{ key: 'homestory' }, { key: 'postinterface' }]}
        viewabilityConfig={_viewabilityConfig.current}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#000']}
            progressBackgroundColor="#ffffff"
          />
        }
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'homestory':
              return <StoryList data={storyData} isLoading={isLoading} />;
            case 'postinterface':
              return (
                <>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#efefef',
                      marginVertical: 3,
                    }}
                  />
                  <PostInterface
                    data={data}
                    isLoading={refreshing}
                    renderSpinner={renderSpinner}
                    loading={loading}
                    fetchData={fetchData}
                  />
                </>
              );
            default:
              return null;
          }
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
