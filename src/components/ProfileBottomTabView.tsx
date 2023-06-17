import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import Ionic from 'react-native-vector-icons/Ionicons';
import { SimpleGrid } from 'react-native-super-grid';

interface IProfileBottomTabViewProps {
  images: any;
  reels: any;
}
interface IPostTabProps {
  images: any;
}
interface IVideoTabProps {
  reels: any;
}

const ProfileBottomTabView = ({
  images,
  reels,
}: IProfileBottomTabViewProps) => {
  const theme = useCustomTheme();
  const [selectedTab, setSelectedTab] = React.useState('Posts');

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 20,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Posts')}
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionic
            name="ios-apps-sharp"
            color={
              selectedTab === 'Posts' ? theme.backButton : theme.disabledIcon
            }
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Videos')}
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionic
            name={
              selectedTab === 'Videos'
                ? 'ios-play-circle'
                : 'ios-play-circle-outline'
            }
            color={
              selectedTab === 'Videos' ? theme.backButton : theme.disabledIcon
            }
            size={22}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          height: 2,
          marginBottom: 2,
        }}>
        <View
          style={{
            backgroundColor:
              selectedTab === 'Posts' ? theme.text : theme.background,
            height: 2,
            width: '50%',
          }}
        />
        <View
          style={{
            backgroundColor:
              selectedTab === 'Videos' ? theme.text : theme.background,
            height: 2,
            width: '50%',
          }}
        />
      </View>
      {selectedTab === 'Posts' ? (
        <Post images={images} />
      ) : (
        <Video reels={reels} />
      )}
    </View>
  );
};

const Video = ({ reels }: IVideoTabProps) => {
  const theme = useCustomTheme();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.background,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      <SimpleGrid
        itemDimension={100}
        spacing={0}
        data={reels}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={{ width: 110, height: 110, margin: 1 }}
            />
          </View>
        )}
        style={{ flex: 1 }}
        listKey={undefined}
      />
    </View>
  );
};

const Post = ({ images }: IPostTabProps) => {
  const theme = useCustomTheme();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.background,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      <SimpleGrid
        itemDimension={100}
        spacing={0}
        data={images}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: item.url }}
              style={{ width: 110, height: 110, margin: 1 }}
            />
          </View>
        )}
        style={{ flex: 1 }}
        listKey={undefined}
      />
    </View>
  );
};

export default ProfileBottomTabView;
