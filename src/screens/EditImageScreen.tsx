import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FILTERS from '../utils/filters';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  PESDK,
  PhotoEditorModal,
  Configuration,
} from 'react-native-photoeditorsdk';

const Tab = createBottomTabNavigator();

const EditImageScreen = ({ route, navigation }: any) => {
  const [editedImageData, setEditedImageData] = useState('');
  const theme = useCustomTheme();
  let { editedImage }: any = route.params;

  console.log('editimage', editedImage);

  const [selectedFilter, setSelectedFilter] = useState(0);
  const newImageArray: any = [];
  const onExtractImage = ({ nativeEvent }: any) => {
    newImageArray.push(nativeEvent);
    console.log('ua', newImageArray);
  };

  const onSelectFilter = (selectedIndex: any) => {
    setSelectedFilter(selectedIndex);
  };

  const renderFilterComponent = ({ item, index }: any) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={{
          width: 100,
          height: 100,
          margin: 5,
        }}
        source={{ uri: editedImage[editedImage.length - 1] }}
        resizeMode="cover"
      />
    );

    return (
      <TouchableOpacity
        onPress={() => onSelectFilter(index)}
        style={{
          backgroundColor: theme.background,
          marginTop: 40,
        }}>
        <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };

  const SelectedFilterComponent = FILTERS[selectedFilter].filterComponent;

  const FilterNewComponent = () => {
    return (
      <View
        style={{
          backgroundColor: theme.background,
          width: '100%',
          height: '100%',
        }}>
        <FlatList
          data={FILTERS}
          keyExtractor={item => item.title}
          horizontal={true}
          renderItem={renderFilterComponent}
        />
      </View>
    );
  };

  const EditNewComponent = () => {
    const openEditorWithImages = async images => {
      for (const image of images) {
        try {
          const editedImage: any = await PESDK.openEditor(image.uri);
          console.log('editedImagehhhh', editedImage);
          setEditedImageData(editedImage);
          // Handle the edited image (e.g., save it, display it, etc.)
        } catch (error) {
          // Handle any errors that occur during editing
        }
      }
    };
    return (
      <View>
        <TouchableOpacity onPress={() => openEditorWithImages(newImageArray)}>
          <Image
            source={{ uri: newImageArray[newImageArray.length - 1] }}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        {editedImageData && (
          <Image
            source={{ uri: editedImageData }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    );
  };

  console.log('hsajahasjsa', editedImageData);
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
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: theme.background,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            style={{ fontSize: 30 }}
            color={theme.text}
          />
        </TouchableOpacity>
        <FontAwesome5
          name="magic"
          style={{ fontSize: 25 }}
          color={theme.text}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.push('NewPost', {
              newImageArray: newImageArray,
            })
          }>
          <AntDesign
            name="arrowright"
            style={{ fontSize: 30, color: theme.mainButtonColor }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: '50%',
        }}>
        {selectedFilter === 0 ? (
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            style={{ padding: 10 }}>
            {editedImage.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    width: 350,
                    height: 320,
                    marginVertical: 10,
                    alignSelf: 'center',
                    marginHorizontal: 10,
                  }}
                  source={{ uri: item }}
                  resizeMode={'cover'}
                />
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            {editedImage.map((item, index) => {
              return (
                <SelectedFilterComponent
                  key={index}
                  onExtractImage={onExtractImage}
                  extractImageEnabled={true}
                  image={
                    <Image
                      key={index}
                      style={{
                        width: 350,
                        height: 320,
                        marginVertical: 10,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                      }}
                      source={{ uri: item }}
                      resizeMode={'cover'}
                    />
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIndicatorStyle: {
            backgroundColor: theme.background,
            height: 1.5,
          },
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarIcon: ({ focused, color }) => {
            let textName = '';
            if (route.name === 'Filter') {
              textName = 'FILTER';
              color = focused ? theme.backButton : theme.disabledIcon;
            } else if (route.name === 'Edit') {
              textName = 'EDIT';
              color = focused ? theme.backButton : theme.disabledIcon;
            }

            return (
              <Text style={{ color: color, fontWeight: 'bold' }}>
                {textName}
              </Text>
            );
          },
        })}>
        <Tab.Screen name="Filter" component={FilterNewComponent} />
        <Tab.Screen name="Edit" component={EditNewComponent} />
      </Tab.Navigator>
    </View>
  );
};

export default EditImageScreen;
