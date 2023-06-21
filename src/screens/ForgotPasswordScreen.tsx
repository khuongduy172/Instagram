import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import useCustomTheme from '../theme/CustomTheme';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { forgotPassword } from '../apis/authApi';
import { useMutation } from 'react-query';

const ForgotPasswordScreen = () => {
  const theme = useCustomTheme();
  const scheme = useColorScheme();
  const navigation: any = useNavigation();

  const instaLogo =
    scheme === 'dark'
      ? require('../assets/images/insta-dark.png')
      : require('../assets/images/insta.png');

  const [email, setEmail] = useState('');
  const [checkEmailValid, setCheckEmailValid] = useState(false);

  const handleCheckEmail = (text: string) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckEmailValid(false);
    } else {
      setCheckEmailValid(true);
    }
  };

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: async data => {
      if (data) {
        ToastAndroid.show('Email sent successfully', ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    },
  });

  const handleForgot = () => {
    Keyboard.dismiss();
    mutate(email);
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        width: '100%',
        height: '100%',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 15 }}>
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color={theme.backButton}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignContent: 'center',
          paddingVertical: 50,
        }}>
        <Image
          source={instaLogo}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
          }}>
          <TextInput
            style={{ padding: 10, width: '100%', color: theme.colors.text }}
            placeholder="Email"
            placeholderTextColor={theme.placeholderTextColor}
            value={email}
            keyboardType="email-address"
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkEmailValid ? (
          <Text style={{ alignSelf: 'flex-end', color: 'red' }}>
            Wrong format email
          </Text>
        ) : (
          <Text style={{ alignSelf: 'flex-end', color: 'red' }}></Text>
        )}

        {email == '' || checkEmailValid == true ? (
          <TouchableOpacity
            disabled={true}
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              borderRadius: 5,
              marginTop: 25,
            }}
            onPress={handleForgot}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700' }}>
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isLoading}
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              borderRadius: 5,
              marginTop: 25,
            }}
            onPress={handleForgot}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700' }}>
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View
          style={{
            borderBottomColor: '#e1e1e1',
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignSelf: 'stretch',
          }}
        />
        <View style={styles.bottomSignUp}>
          <Text style={styles.textBottom}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.push('SignUp')}>
            <Text style={styles.signUp}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  hr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  hrLine: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    flexGrow: 1,
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  facebookContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  facebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookText: {
    color: '#3797EF',
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
  textBottom: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  signUp: {
    color: '#3797EF',
  },
});
