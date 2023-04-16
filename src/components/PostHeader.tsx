import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { PostContext } from '../helper/ImageLibrary';
const PostHeader = () => {
  const navigation: any = useNavigation();
  const theme = useCustomTheme();
  const { state }: any = useContext(PostContext);
  return (
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
            name="close"
            style={{ fontSize: 30 }}
            color={theme.backButton}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            paddingLeft: 15,
          }}>
          New Post
        </Text>
      </View>

      {state.media && (
        <TouchableOpacity
          onPress={() =>
            navigation.push('EditImage', {
              editedImage:
                state.selectedImagesFromAlbum[
                  state.selectedImagesFromAlbum.length - 1
                ] || state.selectedImage[state.selectedImage.length - 1],
            })
          }>
          <AntDesign
            name="arrowright"
            style={{ fontSize: 30, color: theme.mainButtonColor }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostHeader;
