import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useCustomTheme from '../theme/CustomTheme';

const PostInterface = () => {
  const theme = useCustomTheme();
  const postInfo = [
    {
      postTitle: 'anthony.haidang',
      postPersonImage: require('../constants/storage/images/post3.png'),
      postImage: require('../constants/storage/images/post3.png'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'sontungmtp',
      postPersonImage: require('../constants/storage/images/st.png'),
      postImage: require('../constants/storage/images/st.png'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'mono.hng',
      postPersonImage: require('../constants/storage/images/mn.png'),
      postImage: require('../constants/storage/images/mn.png'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'miya.soya',
      postPersonImage: require('../constants/storage/images/tt.png'),
      postImage: require('../constants/storage/images/tt.png'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'khanhvyccf',
      postPersonImage: require('../constants/storage/images/kv.png'),
      postImage: require('../constants/storage/images/kv.png'),
      likes: 765,
      isLiked: false,
    },
  ];
  return (
    <View>
      {postInfo.map((data, index) => {
        const [like, setLike] = useState(data.isLiked);
        return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={data.postPersonImage}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                  }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: theme.text,
                      paddingLeft: 10,
                    }}>
                    {data.postTitle}
                  </Text>
                </View>
              </View>
              <Feather
                name="more-vertical"
                style={{ fontSize: 20 }}
                color={theme.text}
              />
            </View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={data.postImage}
                style={{ width: '100%', height: 400 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setLike(!like)}>
                  <AntDesign
                    name={like ? 'heart' : 'hearto'}
                    style={{
                      paddingRight: 10,
                      fontSize: 20,
                      color: like ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionic
                    name="ios-chatbubble-outline"
                    style={{
                      fontSize: 20,
                      paddingRight: 10,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather
                    name="send"
                    style={{
                      fontSize: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <FontAwesome name="bookmark-o" size={20} />
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <Text>
                Liked by {like ? 'you and' : ''}{' '}
                {like ? data.likes + 1 : data.likes} others
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                Hello ^^
              </Text>
              <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                View all comments
              </Text>
              {/* <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={data.postPersonImage}
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 100,
                                    backgroundColor: "orange",
                                    marginRight: 10,
                                }}
                            />
                            <TextInput
                                placeholder="Add a comment"
                                style={{ opacity: 0.5 }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Entypo
                                name="emoji-happy"
                                style={{
                                    fontSize: 15,
                                    color: "lightgreen",
                                }}
                            />
                        </View>
                    </View> */}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PostInterface;
