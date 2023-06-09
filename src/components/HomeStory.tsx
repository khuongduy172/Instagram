import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import InstaStory from 'react-native-insta-story';
import { getStory } from '../apis/storyApi';
import { useQuery } from 'react-query';
import useCustomTheme from '../theme/CustomTheme';
import { useEffect } from 'react';

const HomeStory = ({ refreshing }) => {
  const theme = useCustomTheme();
  const { data, isLoading, isError, refetch } = useQuery('story', getStory);

  if (isLoading) {
    <ActivityIndicator size="large" color={theme.textSecond} />;
  }
  useEffect(() => {
    if (refreshing) {
      refetch().catch(error => console.error(error));
    }
  }, [refreshing]);
  if (isError) {
    <Text>Something went wrong</Text>;
  }

  return data && <InstaStory data={data} duration={10} />;
};

export default HomeStory;
