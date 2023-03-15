import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
    </View>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
})