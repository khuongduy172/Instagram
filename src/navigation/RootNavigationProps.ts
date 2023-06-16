import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SearchToSendMessage: undefined;
  SearchMain: undefined;
  Message: { user: any };
  Home: { isRefresh?: boolean };
};

type SearchToSendMessageProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchToSendMessage'
>;

type SearchMainProps = NativeStackScreenProps<RootStackParamList, 'SearchMain'>;

type MessageProps = NativeStackScreenProps<RootStackParamList, 'Message'>;

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type {
  SearchToSendMessageProps,
  SearchMainProps,
  MessageProps,
  HomeProps,
};
