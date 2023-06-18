import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SearchToSendMessage: undefined;
  SearchMain: undefined;
  Message: { user: any };
  Home: { isRefresh?: boolean };
  Post: { postId: string };
  ReelById: { reel: any; listReel: any };
};

type SearchToSendMessageProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchToSendMessage'
>;

type SearchMainProps = NativeStackScreenProps<RootStackParamList, 'SearchMain'>;

type MessageProps = NativeStackScreenProps<RootStackParamList, 'Message'>;

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type PostProps = NativeStackScreenProps<RootStackParamList, 'Post'>;

type ReelByIdProps = NativeStackScreenProps<RootStackParamList, 'ReelById'>;

export type {
  SearchToSendMessageProps,
  SearchMainProps,
  MessageProps,
  HomeProps,
  PostProps,
  ReelByIdProps,
};
