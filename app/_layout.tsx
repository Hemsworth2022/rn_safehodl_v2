import { Stack, useRouter } from 'expo-router';
import { Appbar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="cryptoDetails"
        options={({ route }: any) => ({
          header: () => (
            <Appbar.Header mode='center-aligned'>
              <Appbar.BackAction onPress={() => router.back()} />
              <Appbar.Content
                title={<View>
                  <Text style={styles.headerTitle}>{route.params.title}</Text>
                  <Text style={styles.headerSubtitle}>{route.params.subtitle}</Text>
                </View>}
              />
              <Appbar.Action
                icon="bell"
                onPress={() => alert('Search icon clicked!')}
              />
              <Appbar.Action
                icon="information"
                onPress={() => alert('Search icon clicked!')}
              />

            </Appbar.Header>
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />

      <Stack.Screen name="dashboard" options={{ headerShown: false, title: 'Home' }} />

      <Stack.Screen name="addExistingWallet" options={{
        title: 'Add existing wallet',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />
      <Stack.Screen name="createWallet" options={{ headerShown: false }} />
      <Stack.Screen name="quickQuiz" options={{
        title: 'Quick Quiz',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />

      <Stack.Screen name="safetytips" options={{
        title: 'Safety Tips',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />
      <Stack.Screen name="details" options={{ headerShown: false }} />

      <Stack.Screen name="receive" options={{
        title: 'Receive',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />

      <Stack.Screen name="send" options={{
        title: 'Send',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />

      <Stack.Screen name="transfer" options={{
        title: 'Transfer Details',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />

      <Stack.Screen name="setWalletName" options={{
        title: 'Set Wallet Name',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
      }} />
    </Stack>
  );
}


// navigation.setOptions({
//   // key-value pairs for setting navigation options dynamically
//   title: 'New Title',
//   headerStyle: {
//     backgroundColor: 'blue',
//   },
//   headerTintColor: 'white',
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
});