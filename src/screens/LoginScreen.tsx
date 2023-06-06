import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogin, postExternalLogin } from '../apis/authApi';
import { setLoggedIn } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useCustomTheme from '../theme/CustomTheme';
import { useMutation } from 'react-query';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const LoginScreen = ({ navigation }: any) => {
  const theme = useCustomTheme();
  const scheme = useColorScheme();

  const instaLogo =
    scheme === 'dark'
      ? require('../assets/images/insta-dark.png')
      : require('../assets/images/insta.png');

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
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

  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess: async data => {
      if (data && data.token) {
        await AsyncStorage.setItem('accessToken', data.token);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
        console.log(data.token);
        dispatch(setLoggedIn(true));
        ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
      }
    },
  });

  const { mutate: facebookLogin, isLoading: facebookIsLoading } = useMutation(
    postExternalLogin,
    {
      onSuccess: async data => {
        if (data && data.token) {
          await AsyncStorage.setItem('accessToken', data.token);
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
          dispatch(setLoggedIn(true));
          ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
        }
      },
    },
  );

  const handleFacebookLogin = async () => {
    await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
      'user_friends',
    ]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            console.log(data.accessToken.toString());
            facebookLogin({
              idToken: data.accessToken.toString(),
              provider: 'Facebook',
            });
          });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };
    mutate(body);
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
            placeholder="Phone number, username or email"
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
            placeholder="Password"
            placeholderTextColor={theme.placeholderTextColor}
            value={password}
            secureTextEntry={seePassword}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 0, padding: 10 }}
            onPress={() => setSeePassword(!seePassword)}>
            <Entypo
              name={seePassword ? 'eye' : 'eye-with-line'}
              size={15}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'flex-end' }}>
          <Text
            style={{
              textAlign: 'right',
              color: '#3797EF',
              paddingVertical: 15,
            }}>
            Forgot password?
          </Text>
        </View>

        {email == '' || password == '' || checkEmailValid == true ? (
          <TouchableOpacity
            disabled
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              opacity: 0.6,
              borderRadius: 5,
              marginTop: 25,
            }}
            onPress={handleLogin}>
            {facebookIsLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700' }}>Log In</Text>
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
            onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700' }}>Log In</Text>
            )}
          </TouchableOpacity>
        )}
        <View style={styles.hr}>
          <View style={styles.hrLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.hrLine} />
        </View>

        <View style={styles.facebookContainer}>
          <View style={styles.facebook}>
            <TouchableOpacity
              onPress={handleFacebookLogin}
              style={{ flexDirection: 'row' }}>
              <Entypo name="facebook" size={20} color="#3797EF" />
              <Text style={styles.facebookText}>Log In with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default LoginScreen;

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
