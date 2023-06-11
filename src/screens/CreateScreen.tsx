import { StyleSheet, View, BackHandler } from 'react-native';
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import * as Permissions from 'react-native-permissions';
import { PostContext } from '../helper/ImageLibrary';
import { initialState, PostReducer } from '../redux/imageSlice';
import { useNavigation } from '@react-navigation/native';
import ListPhotos from '../components/ListPhotos';
import SelectedImage from '../components/SelectedImage';
import SelectAlbum from '../components/SelectedAlbum';
import PostHeader from '../components/PostHeader';
import useCustomTheme from '../theme/CustomTheme';

const CreateScreen = () => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer<any>(PostReducer, initialState);
  const [loaded, setLoaded] = useState(false);
  const theme = useCustomTheme();

  useEffect(() => {
    const askPermission = async () => {
      const isCameraRollEnabled = await Permissions.check(
        'android.permission.CAMERA',
      );
      if (!isCameraRollEnabled) {
        setLoaded(true);
        return;
      }
      const status = await Permissions.request('android.permission.CAMERA');
      if (status) {
        const cameraRollRes = await Permissions.check(
          'android.permission.CAMERA',
        );
        setLoaded(true);
      }
    };
    askPermission();
  }, [navigation, loaded]);
  const clearUpDataOnUnMount: any = useCallback(() => {
    setLoaded(false);
    dispatch({ type: 'EMPTY' });
  }, [loaded]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      clearUpDataOnUnMount,
    );
    return () => backHandler.remove();
  }, [clearUpDataOnUnMount]);

  useEffect(() => {
    const blur: any = navigation.addListener('focus', () => {
      setLoaded(val => !val);
    });
    console.log(blur);
  }, [loaded, navigation]);

  return (
    <>
      {loaded && (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <PostContext.Provider value={{ state, dispatch }}>
              <PostHeader />
              <SelectedImage />
              <SelectAlbum />
              <ListPhotos />
            </PostContext.Provider>
          </View>
        </View>
      )}
    </>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({});
