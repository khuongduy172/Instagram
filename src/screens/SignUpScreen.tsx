import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
  useColorScheme,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postLogin, postRegister} from '../apis/authApi';
import {setLoggedIn} from '../redux/authSlice';
import {useDispatch} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useCustomTheme from '../theme/CustomTheme';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [isMale, setIsMale] = useState(true);

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

  const checkPasswordValidity = (value: string) => {
    const isNonWhiteSpace = /^\S+$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain white spaces';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    return null;
  };

  const handleSignUp = async () => {
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      const body = {
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        name: name,
        isMale: isMale,
      };
      const res = await postRegister(body);
      ToastAndroid.show('Registered successfully!', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  const theme = useCustomTheme();
  const scheme = useColorScheme();

  const instaLogo =
    scheme === 'dark'
      ? require('../assets/images/insta-dark.png')
      : require('../assets/images/insta.png');
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        width: '100%',
        height: '100%',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{padding: 15}}>
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
          marginTop: -30,
          marginBottom: 10,
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
            style={{padding: 10, width: '100%'}}
            placeholder="Email"
            value={email}
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkEmailValid ? (
          <Text style={{alignSelf: 'flex-end', color: 'red'}}>
            Wrong format email
          </Text>
        ) : (
          <Text style={{alignSelf: 'flex-end', color: 'red'}}></Text>
        )}
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            marginTop: 10,
          }}>
          <TextInput
            style={{padding: 10, width: '100%'}}
            placeholder="Password"
            value={password}
            secureTextEntry={seePassword}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 0, padding: 10}}
            onPress={() => setSeePassword(!seePassword)}>
            <Entypo
              name={seePassword ? 'eye' : 'eye-with-line'}
              size={15}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            marginTop: 30,
          }}>
          <TextInput
            style={{padding: 10, width: '100%'}}
            placeholder="Confirm Password"
            value={passwordConfirm}
            secureTextEntry={seePassword}
            onChangeText={text => setPasswordConfirm(text)}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 0, padding: 10}}
            onPress={() => setSeePassword(!seePassword)}>
            <Entypo
              name={seePassword ? 'eye' : 'eye-with-line'}
              size={15}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            marginTop: 30,
          }}>
          <TextInput
            style={{padding: 10, width: '100%'}}
            placeholder="Your name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: theme.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            marginTop: 30,
          }}>
          <TextInput
            style={{padding: 10, width: '100%'}}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14, paddingRight: 30}}>
            Gender
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 30,
              }}>
              <RadioButton
                value="Male"
                status={isMale === true ? 'checked' : 'unchecked'}
                onPress={() => setIsMale(true)}
                color="#3797EF"
              />
              <Text style={{color: theme.colors.text}}>Male</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Female"
                status={isMale === false ? 'checked' : 'unchecked'}
                onPress={() => setIsMale(false)}
                color="#3797EF"
              />
              <Text>Female</Text>
            </View>
          </View>
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
            onPress={handleSignUp}>
            <Text style={{color: 'white', fontWeight: '700'}}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              borderRadius: 5,
              marginTop: 25,
            }}
            onPress={handleSignUp}>
            <Text style={{color: 'white', fontWeight: '700'}}>Sign Up</Text>
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
          <Text style={styles.textBottom}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={styles.signUp}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
