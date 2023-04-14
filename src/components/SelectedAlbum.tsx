import React, { useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Media, { PostContext } from '../helper/ImageLibrary';
import useCustomTheme from '../theme/CustomTheme';

const SelectAlbum = () => {
  const { state, dispatch }: any = useContext(PostContext);
  const theme = useCustomTheme();

  useEffect(() => {
    async function getListAlbum() {
      const getAlbumList = await Media.getAlbumList();
      dispatch({ type: 'GET_ALBUM_LIST', payload: getAlbumList });
    }
    getListAlbum();
  }, [dispatch]);

  return (
    <>
      <Modal
        isVisible={state.modalVisible}
        onBackButtonPress={() => dispatch({ type: 'MODAL' })}
        swipeDirection="down"
        onSwipeComplete={() => dispatch({ type: 'MODAL' })}
        animationOut="slideOutDown"
        style={{
          justifyContent: 'flex-end',
          marginTop: 200,
          marginBottom: 0,
          marginHorizontal: 0,
          backgroundColor: theme.backgroundColor,
        }}>
        <TouchableOpacity
          onPressOut={() => dispatch({ type: 'MODAL' })}
          activeOpacity={1}
          style={{ height: '150%' }}>
          <View
            style={{
              height: '72%',
              marginTop: 'auto',
              backgroundColor: theme.background,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 5,
                borderRadius: 20,
                backgroundColor: theme.textSecond,
                alignSelf: 'center',
                marginTop: 5,
              }}></View>
            <ScrollView>
              <View style={{ padding: 10 }}>
                {state.albumList &&
                  state.albumList.map((album: any, index: any) => (
                    <TouchableNativeFeedback
                      key={index}
                      style={{ width: '100%' }}
                      onPress={() => {
                        dispatch({ type: 'SET_ALBUM_NAME', payload: album });
                        dispatch({ type: 'MODAL' });
                      }}>
                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: theme.text,
                          }}>
                          {album}
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                  ))}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* <Modal
        isVisible={state.modalVisible}
        onBackButtonPress={() => dispatch({ type: 'MODAL' })}
        swipeDirection="down"
        onSwipeComplete={() => dispatch({ type: 'MODAL' })}
        animationOut="slideOutDown"
        style={{
          width: '100%',
          padding: 0,
          margin: 0,
          backgroundColor: theme.backgroundColor,
        }}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              marginTop: '2%',
            }}>
            <FontAwesome name="minus" size={48} />
          </View>
          <View>
            {state.albumList &&
              state.albumList.map((album: any, index: any) => (
                <TouchableNativeFeedback
                  key={index}
                  style={{ width: '100%' }}
                  onPress={() => {
                    dispatch({ type: 'SET_ALBUM_NAME', payload: album });
                    dispatch({ type: 'MODAL' });
                  }}>
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{ fontFamily: 'Roboto-Regular', fontSize: 16 }}>
                      {album}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
          </View>
        </ScrollView>
      </Modal> */}
    </>
  );
};

export default SelectAlbum;
