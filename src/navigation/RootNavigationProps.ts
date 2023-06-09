import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SearchToSendMessage: undefined;
  SearchMain: undefined;
};

type SearchToSendMessageProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchToSendMessage'
>;

type SearchMainProps = NativeStackScreenProps<RootStackParamList, 'SearchMain'>;

export type { SearchToSendMessageProps, SearchMainProps };
