import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SearchToSendMessage: undefined;
  SearchMain: undefined;
  Message: { user: any };
};

type SearchToSendMessageProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchToSendMessage'
>;

type SearchMainProps = NativeStackScreenProps<RootStackParamList, 'SearchMain'>;

type MessageProps = NativeStackScreenProps<RootStackParamList, 'Message'>;

export type { SearchToSendMessageProps, SearchMainProps, MessageProps };
