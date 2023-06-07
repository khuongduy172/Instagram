import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCustomTheme from '../theme/CustomTheme';
import { debounce } from 'lodash';
import { SearchUserResponse, searchUser } from '../apis/userApi';
import UserSearchItem from '../components/UserSearchItem';
import { SearchToSendMessageProps } from '../navigation/RootNavigationProps';

const SearchToSendMessageScreen = ({
  route,
  navigation,
}: SearchToSendMessageProps) => {
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
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.text} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          autoFocus={true}
          onChangeText={onChangeText}
          style={{
            backgroundColor: theme.background,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            color: theme.text,
            fontSize: 20,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
          }}
        />
      </View>
      <View
        style={{
          borderBottomColor: theme.text,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <UserSearchItem data={item} />}
      />
    </View>
  );
};

export default SearchToSendMessageScreen;
