import { Text, BottomNavigation, Appbar, Avatar } from 'react-native-paper';
import React from 'react';
import { View, StyleSheet } from 'react-native';


function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default DiscoverScreen;
