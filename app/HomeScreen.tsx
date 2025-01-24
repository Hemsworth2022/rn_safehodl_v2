import { Text, BottomNavigation, Appbar, Avatar, Banner, Button } from 'react-native-paper';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabViewNavigation from './TabViewNavigation';

const HomeScreen = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <Button mode="contained" style={{ width: 200 }} onPress={() => console.log('Pressed')}>
        Buy BDX Domain
      </Button>
      <TabViewNavigation/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
});

export default HomeScreen;
