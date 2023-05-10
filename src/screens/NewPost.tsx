import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { postStatus } from '../apis/postApi';
import { useMutation } from 'react-query';
import { PESDK } from 'react-native-photoeditorsdk';
import { useIsFocused } from '@react-navigation/native';

const NewPost = ({ route, navigation }) => {
  const { newImageArray } = route.params;
  const [status, setStatus] = useState('');
  const theme = useCustomTheme();

  const isFocused = useIsFocused();
  const [editedImageData, setEditedImageData] = useState([]);
  const openEditorWithImages = async (images: any) => {
    try {
      for (const image of images) {
        const result = await PESDK.openEditor(image.uri);
        if (result != null) {
          console.log('editedImagehhhh', result);
          setEditedImageData(prevImageData => [...prevImageData, result]);
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      openEditorWithImages(newImageArray);
    }
  }, [isFocused]);

  console.log('editedImageData', editedImageData);
  console.log('newImageArray', newImageArray);

  const { mutate, isLoading: postNewStatus } = useMutation(postStatus, {
    onSuccess: data => {
      if (data) {
        ToastAndroid.show('Posted successfully', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Posted failed', ToastAndroid.SHORT);
      }
    },
  });

  const handlePost = () => {
    let formData = new FormData();

    formData.append('Content', status);

    if (editedImageData && editedImageData.length > 0) {
      editedImageData.forEach((item: any, index: any) => {
        formData.append('Files', {
          uri: item.image,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
    } else {
      newImageArray.forEach((item: any, index: any) => {
        formData.append('Files', {
          uri: item.uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
    }

    mutate(formData);
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
        <TouchableOpacity onPress={handlePost}>
          {postNewStatus ? (
            <ActivityIndicator size="small" color={theme.mainButtonColor} />
          ) : (
            <Feather
              name="check"
              style={{ fontSize: 30, color: theme.mainButtonColor }}
            />
          )}
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
          value={status}
          onChangeText={status => setStatus(status)}
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
