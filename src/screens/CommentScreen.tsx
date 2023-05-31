import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ShareIcon from '../assets/images/instagram-share-icon.svg';
import moment from 'moment-timezone';
import CommentList from '../components/CommentList';
import Avatar from '../components/Avatar';

const CommentScreen = ({ route, navigation }: any) => {
  const { avatar, username, createdAt, content }: any = route.params;
  const theme = useCustomTheme();

  const [caption, setCaption] = useState('');
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
          padding: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.backButton} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            paddingHorizontal: 30,
          }}>
          Comments
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 25,
          }}>
          <ShareIcon width={25} height={25} fill={theme.text} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            padding: 15,
            marginTop: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              uri={avatar}
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 13,
                marginTop: -7,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: theme.text,
                  }}>
                  {username}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingHorizontal: 10,
                    color: theme.textSecond,
                    fontWeight: 'bold',
                  }}>
                  {moment.utc(item.createdAt).tz('Asia/Ho_Chi_Minh').fromNow()}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: theme.text,
                  paddingVertical: 10,
                }}>
                {content}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#efefef',
            marginVertical: 3,
          }}
        />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderTopColor: theme.borderColor,
        }}>
        <Avatar
          uri={avatar}
          style={{ width: 35, height: 35, borderRadius: 100 }}
        />
        <TextInput
          placeholder="Add a comment..."
          style={{
            paddingHorizontal: 30,
            color: theme.text,
            width: '85%',
          }}
          onChangeText={text => setCaption(text)}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 25,
          }}>
          <ShareIcon width={20} height={20} fill={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentScreen;
