import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width) / 4 - 5;

const styles = StyleSheet.create({
  Image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'cover',
    marginRight: 5,
  },
  Selected_Image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  Text: {
    fontSize: 13,
  },
  Selected: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
