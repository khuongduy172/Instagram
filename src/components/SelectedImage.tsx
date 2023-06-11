import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Media, { PostContext, launchCamera } from '../helper/ImageLibrary';
import Feather from 'react-native-vector-icons/Feather';
import useCustomTheme from '../theme/CustomTheme';

const SelectedImage = () => {
  const { state, dispatch }: any = useContext(PostContext);
  const theme = useCustomTheme();

  useEffect(() => {
    async function getSelectedImage() {
      const photo = await Media.photo(state.albumName);

      dispatch({ type: 'SET_MEDIA', payload: photo?.edges });
      dispatch({ type: 'DEFAULT_IMAGE' });
    }
    getSelectedImage().catch(err => console.log(err));
  }, [state.albumName, dispatch]);

  const getPhotoFromCamera = async () => {
    const photoDetail: any = await launchCamera();
    if (photoDetail?.didCancel) {
      console.log('cancelled');
      return;
    }
    console.log('po', photoDetail);
    if (!photoDetail.didCancel && photoDetail?.assets[0].uri) {
      const uri = photoDetail.assets[0].uri;
      dispatch({
        type: 'ADD_IMAGE',
        payload: {
          photoUri: uri,
          multiple: false,
        },
      });
    }
  };

  return (
    <>
      {((state.selectedImagesFromAlbum &&
        state.selectedImagesFromAlbum.length > 0) ||
        (state.selectedImage && state.selectedImage.length > 0)) && (
        <View
          style={{
            marginTop: '5%',
            width: '100%',
            height: '50%',
            overflow: 'scroll',
          }}>
          <Image
            source={{
              uri:
                state.selectedImagesFromAlbum &&
                state.selectedImagesFromAlbum.length > 0
                  ? state.selectedImagesFromAlbum[
                      state.selectedImagesFromAlbum.length - 1
                    ]
                  : state.selectedImage && state.selectedImage.length > 0
                  ? state.selectedImage[state.selectedImage.length - 1]
                  : null,
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '5%',
          marginTop: '5%',
        }}>
        <TouchableOpacity onPress={() => dispatch({ type: 'MODAL' })}>
          <View
            style={{
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>
              {state.albumName}
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                marginLeft: '3%',
              }}>
              <Feather name="chevron-down" size={16} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => dispatch({ type: 'SET_MULTIPLE_IMAGE' })}>
            <View
              style={{
                borderRadius: 30,
                backgroundColor: state.multiple
                  ? '#0275d8'
                  : theme.backgroundButton,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <MaterialCommunityIcons
                name="image-filter-none"
                size={18}
                color="white"
              />
              <Text style={{ color: 'white', fontSize: 13, paddingLeft: 10 }}>
                Choose Many
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onPress={getPhotoFromCamera}>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 30,
                backgroundColor: theme.backgroundButton,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={18}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SelectedImage;
