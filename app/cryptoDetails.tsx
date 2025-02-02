
import { Text, BottomNavigation, Appbar, Avatar, IconButton, Provider as PaperProvider, Button, Icon, MD3Colors, Divider, Provider } from 'react-native-paper';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomDrawer from './BottomDrawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TradeChart from './TradeChart';

const CryptoDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.wrappercontainer}>
      <View style={styles.container}>
        <View style={{ margin: 5, backgroundColor: '#f3f3f3', borderRadius: 10, width: 'auto', height: 100, borderStyle: 'solid', borderColor: '#333', borderWidth: 1 }}>
          <Text variant='titleLarge' style={{ textAlign: 'center', paddingTop: 20 }}>{params.title}</Text>
          <Text variant='titleMedium' style={{ textAlign: 'center', paddingTop: 4, fontWeight: 500 }}>$0.00</Text>

        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
          <View style={{ width: 60 }}>
            <IconButton
              icon="arrow-up-thin"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
              onPress={() => router.push("/send")}
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Send</Text>
          </View>
          <View style={{ width: 60 }}>
            <IconButton
              icon="arrow-down-thin"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
              onPress={() => router.push('/receive')}
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Receive</Text>
          </View>
        </View>
        <Divider bold={true} />
    
    <View style={{ flex:1, height: '100%' }}></View>
      </View>
      <BottomDrawer title={params.title} />
    </View>

  );
}

const styles = StyleSheet.create({
  wrappercontainer: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1,
    padding: 5,
    height: '100%'
  }, customButton: {
    width: 80,
    borderRadius: 60,
    // paddingVertical: 10,
    marginBottom: 15,
    justifyContent: 'center', // Vertically center the button content
  },
  buttonContent: {
    alignItems: 'center', // Center everything inside the button
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center', // Ensure text is centered
  },
  icon: {
    marginTop: 8, // Add some space between the text and the icon
  },
});

export default CryptoDetails;
