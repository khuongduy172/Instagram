import React, { useState, useRef } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import SearchBox from '../components/SearchBox';
import SearchContent from '../components/SearchContent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [image, setImage] = useState(null);

  const getData = data => {
    setImage(data);
  };

  const windowWidth = Dimensions.get('window').width;
  const windoeHeight = Dimensions.get('window').height;

  const _viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[{ key: 'searchbox' }, { key: 'searchcontent' }]}
        viewabilityConfig={_viewabilityConfig.current}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'searchbox':
              return <SearchBox />;
            case 'searchcontent':
              return <SearchContent data={getData} />;
            default:
              return null;
          }
        }}
      />
      {image ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(52,52,52,0.8)',
          }}>
          <StatusBar backgroundColor="#525252" barStyle="dark-content" />
          <View
            style={{
              position: 'absolute',
              top: windoeHeight / 6,
              left: windowWidth / 18,
              backgroundColor: 'white',
              width: '90%',
              height: 465,
              borderRadius: 15,
              zIndex: 1,
              elevation: 50,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Image
                source={image}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                }}
              />
              <View style={{ paddingLeft: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '600' }}>
                  anthony.haidang
                </Text>
              </View>
            </View>
            <Image source={image} style={{ width: '100%', height: '80%' }} />
            <View
              style={{
                justifyContent: 'space-around',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8,
              }}>
              <Ionic name="ios-heart-outline" style={{ fontSize: 26 }} />
              <Ionic
                name="ios-person-circle-outline"
                style={{ fontSize: 26 }}
              />
              <Feather name="navigation" style={{ fontSize: 26 }} />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SearchScreen;
