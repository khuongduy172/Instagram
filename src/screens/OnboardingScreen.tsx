import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 150,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          source={require('../assets/images/insta.png')}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3797EF',
            borderRadius: 5,
            marginTop: 25,
          }}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: 'white', fontWeight: '700'}}>Log In</Text>
        </TouchableOpacity>
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

export default OnboardingScreen;

const styles = StyleSheet.create({
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
