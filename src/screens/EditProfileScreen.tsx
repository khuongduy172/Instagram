import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionics from 'react-native-vector-icons/Ionicons';
import { editUserOwner, updateUserImage } from '../apis/userApi';
import { useMutation } from 'react-query';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = ({ route, navigation }: any) => {
  const { name, accountName, profileImage, status } = route.params;
  const [newName, setNewName] = useState(name);
  const [newAccountName, setNewAccountName] = useState(accountName);
  const [newStatus, setNewStatus] = useState(status);
  const [newProfileImage, setNewProfileImage] = useState<any>({});

  const theme = useCustomTheme();
  const ToastMessage = () => {
    ToastAndroid.show('Profile updated!', ToastAndroid.SHORT);
  };

  const { mutate, isLoading } = useMutation(editUserOwner, {
    onSuccess: () => {
      ToastMessage();
      navigation.goBack();
    },
  });

  const handleEditUser = async () => {
    const data = {
      name: newName,
      accountName: newAccountName,
      status: newStatus,
    };
    mutate(data);
  };

  const chooseFile = (type: any) => {
    const options: any = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response: any) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      setNewProfileImage(response);
    });
  };

  const handleChangeAvatar = async () => {
    let formData = new FormData();

    formData.append('File', {
      name: newProfileImage.assets[0].fileName,
      type: newProfileImage.assets[0].type,
      uri: newProfileImage.assets[0].uri,
      fileSize: newProfileImage.assets[0].fileSize,
      height: newProfileImage.assets[0].height,
      width: newProfileImage.assets[0].width,
    });

    console.log(formData);

    navigation.goBack();
    await updateUserImage(formData);
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
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="close"
            style={{ fontSize: 30 }}
            color={theme.backButton}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.text }}>
          Edit Profile
        </Text>
        <TouchableOpacity disabled={isLoading} onPress={handleChangeAvatar}>
          <Feather
            name="check"
            style={{ fontSize: 30, color: theme.mainButtonColor }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={
              newProfileImage &&
              newProfileImage.assets &&
              newProfileImage.assets[0]
                ? { uri: newProfileImage.assets[0].uri }
                : { uri: profileImage }
            }
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              marginRight: 20,
            }}
          />
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#c8c8c8',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="face-man-shimmer-outline"
              size={25}
              color={theme.text}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => chooseFile('photo')}>
          <Text
            style={{
              color: theme.mainButtonColor,
              fontWeight: 'bold',
              paddingTop: 20,
            }}>
            Change profile photo or avatar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ paddingTop: 10, paddingBottom: 5 }}>
          <Text style={{ color: theme.textSecond }}>Name</Text>
          <TextInput
            placeholder="Name"
            defaultValue={name}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#cdcdcd',
            }}
            onChangeText={text => setNewName(text)}
          />
        </View>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ color: theme.textSecond }}>Username</Text>
          <TextInput
            placeholder="Account Name"
            defaultValue={accountName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#cdcdcd',
            }}
            onChangeText={text => setNewAccountName(text)}
          />
        </View>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ color: theme.textSecond }}>Bio</Text>
          <TextInput
            placeholder="Bio"
            defaultValue={status}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: '#cdcdcd',
            }}
            onChangeText={text => setNewStatus(text)}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: theme.text, fontSize: 15 }}>Add links</Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: 20,
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <Text
        style={{
          padding: 15,
          fontSize: 15,
          color: theme.text,
          fontWeight: 'bold',
        }}>
        Connected facebook page
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <Text style={{ color: theme.text, fontSize: 15 }}>Page</Text>
        <Ionics name="chevron-forward" size={15} color={theme.text} />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <Text
        style={{
          padding: 15,
          fontSize: 15,
          color: theme.mainButtonColor,
        }}>
        Switch to work account
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#efefef',
        }}></View>
      <Text
        style={{
          padding: 15,
          fontSize: 15,
          color: theme.mainButtonColor,
        }}>
        Personal information settings
      </Text>
    </View>
  );
};

export default EditProfileScreen;
