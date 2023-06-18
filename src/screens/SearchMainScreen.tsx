import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCustomTheme from '../theme/CustomTheme';
import { debounce } from 'lodash';
import { SearchUserResponse, searchUser } from '../apis/userApi';
import UserSearchItem from '../components/UserSearchItem';
import {
  SearchMainProps,
  SearchToSendMessageProps,
} from '../navigation/RootNavigationProps';
import Ionic from 'react-native-vector-icons/Ionicons';

const SearchMainScreen = ({
  route,
  navigation,
}: SearchToSendMessageProps | SearchMainProps) => {
  const theme = useCustomTheme();
  const [data, setData] = React.useState<SearchUserResponse[]>([]);
  const debounceSearch = debounce(async (text: string) => {
    console.log(text);
    if (text === '' || text.trim() === '') {
      setData([]);
    } else {
      const result = await searchUser(text.trim());
      if (result) {
        setData(result);
      }
    }
  }, 1000);

  const onChangeText = (text: string) => {
    debounceSearch(text)?.catch(err => console.log(err));
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        width: '100%',
        height: '100%',
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}>
          <AntDesign name="arrowleft" size={30} color={theme.text} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '85%',
            position: 'relative',
          }}>
          <Ionic
            name="search"
            style={{
              fontSize: 18,
              opacity: 0.7,
              position: 'absolute',
              zIndex: 1,
              left: 25,
            }}
          />
          <TextInput
            placeholder="Search"
            autoFocus={true}
            onChangeText={onChangeText}
            style={{
              width: '94%',
              backgroundColor: theme.backgroundColor,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              padding: 4,
              paddingLeft: 40,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 17 }}>
          Recent
        </Text>
        <TouchableOpacity>
          <Text style={{ color: theme.mainButtonColor }}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <UserSearchItem data={item} routeName={route.name} />
        )}
      />
    </View>
  );
};

export default SearchMainScreen;
