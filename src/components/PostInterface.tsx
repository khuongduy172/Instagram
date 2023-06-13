import { FlatList } from 'react-native';
import React, { useRef } from 'react';
import PostLoader from './loader/posts';
import { viewStatus } from '../apis/postApi';
import Post from './Post';

const PostInterface = ({
  data,
  isLoading,
  renderSpinner,
  loading,
  fetchData,
}: any) => {
  const previousViewedItems = useRef([]);
  const processedIds = useRef([]);

  const _onViewableItemsChanged = useRef(({ viewableItems }) => {
    const newViewedItems = viewableItems.filter(
      item => !previousViewedItems.current.includes(item.item.id),
    );

    newViewedItems.forEach(item => {
      const id = item.item.id;
      if (!processedIds.current.includes(id)) {
        viewStatus(id);
        processedIds.current.push(id);
      }
    });

    previousViewedItems.current = viewableItems.map(item => item.item.id);
  });

  const _viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  });

  if (isLoading) {
    return <PostLoader />;
  }

  return (
    <>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={_onViewableItemsChanged.current}
        keyExtractor={(item, index) => index.toString()}
        viewabilityConfig={_viewabilityConfig.current}
        ListFooterComponent={loading ? renderSpinner : null}
        renderItem={({ item }) => <Post item={item} />}
      />
    </>
  );
};

export default PostInterface;
