import { createContext } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

async function hasAndroidPermission() {
  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export const PostContext = createContext(null);

const getAlbumList = async () => {
  const getAlbum = await CameraRoll.getAlbums({ assetType: 'All' });
  return getAlbum;
};

const photo = async (getAlbums: any) => {
  try {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    } else {
      const albums = await CameraRoll.getAlbums();
      const album = albums.find(a => a.title === getAlbums);
      if (!album) {
        throw new Error(`Album ${getAlbums} not found.`);
      }
      const photos = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        groupName: album.title,
        groupTypes: 'All',
      });
      return photos;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const launchCamera = async () => {
  const isCameraEnabled = await check('android.permission.CAMERA');
  if (!isCameraEnabled) {
    const status: any = await request('android.permission.CAMERA');
    if (!status) {
      return false;
    }
  }
  const { didCancel, assets }: any = await ImagePicker.launchCamera({
    mediaType: 'mixed',
    durationLimit: 120,
    quality: 0.9,
  });
  return {
    didCancel,
    assets,
  };
};

export default {
  getAlbumList,
  photo,
};
