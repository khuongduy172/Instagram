import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FILTERS from '../utils/filters';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const EditImageScreen = ({ route, navigation }: any) => {
  const theme = useCustomTheme();
  let { editedImage }: any = route.params;

  const [selectedFilter, setSelectedFilter] = useState(0);
  const onExtractImage = ({ nativeEvent }: any) => {
    editedImage = nativeEvent;
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
        source={{ uri: editedImage }}
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
    return <Text>h</Text>;
  };
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
        <TouchableOpacity>
          <AntDesign
            name="arrowright"
            style={{ fontSize: 30, color: theme.mainButtonColor }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
        }}>
        {selectedFilter === 0 ? (
          <Image
            style={{
              width: 400,
              height: 350,
              marginVertical: 10,
              alignSelf: 'center',
            }}
            source={{ uri: editedImage }}
            resizeMode={'cover'}
          />
        ) : (
          <SelectedFilterComponent
            onExtractImage={onExtractImage}
            extractImageEnabled={true}
            image={
              <Image
                source={{
                  uri: editedImage,
                }}
                style={{
                  width: 400,
                  height: 350,
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
                resizeMode={'cover'}
              />
            }
          />
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
