import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const NewPost = ({ route, navigation }) => {
  const { newImageArray } = route.params;
  const theme = useCustomTheme();
  console.log(newImageArray);
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              style={{ fontSize: 30 }}
              color={theme.text}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.text,
              paddingLeft: 30,
            }}>
            New Post
          </Text>
        </View>

        <TouchableOpacity>
          <Feather
            name="check"
            style={{ fontSize: 30, color: theme.mainButtonColor }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 15, marginTop: 10, flexDirection: 'row' }}>
        <Image
          source={newImageArray[newImageArray.length - 1]}
          style={{ width: 70, height: 70 }}
        />
        <TextInput
          placeholder="Write caption..."
          style={{ paddingLeft: 15, color: theme.text }}
        />
      </View>
      <View
        style={{
          paddingTop: 5,
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>
          Tag someone else
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 5,
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>Add location</Text>
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 5,
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <TouchableOpacity style={{ padding: 15 }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>Add music</Text>
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 5,
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <TouchableOpacity
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>
          Advanced settings
        </Text>
        <Feather
          name="chevron-right"
          style={{ fontSize: 20, color: theme.text, paddingLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewPost;