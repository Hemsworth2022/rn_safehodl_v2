import React from 'react';
import { Image, StyleSheet, Platform, View, TextInput, Alert } from 'react-native';
import { Button, Text, Provider as PaperProvider } from 'react-native-paper';
// import { ThemeProvider, useThemeContext } from '../ThemeContext'; // Import context
import { useRouter } from 'expo-router';
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper'; // Import MD3 themes

const App = () => {
  // const { theme } = useThemeContext(); // Get current theme
  const router = useRouter(); // Initialize useRouter

  const navigateToProfile = () => {
    router.push('/login'); // Navigate to /profile route /login
  };

  return (
    <PaperProvider theme={MD3LightTheme}>
      <View style={styles.container}>
        <Text variant='displaySmall'>SafeHodl Wallet</Text>
        <Button mode="contained" onPress={navigateToProfile}>
          <Text>Get Started</Text>
        </Button>
      </View>
    </PaperProvider>
  );
};

const Root = () => {
  return (
      <App />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Root;
