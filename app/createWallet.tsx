import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Link , useNavigation, useRouter} from 'expo-router';
import { Avatar, Card, Button, Text, Divider, Surface, IconButton } from 'react-native-paper';

export default function CreateNewWallet() {
  //     const navigation = useNavigation();
  const router = useRouter(); // Initialize useRouter

  //   useEffect(() => {
  //     navigation.setOptions({ headerShown: false });
  //   }, [navigation]);
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={<Text variant="titleLarge">SafeHodl</Text>}
          style={styles.cardTitle}
          left={(props) =>  <IconButton
            icon="chevron-left"
            size={20}
            onPress={() => router.back()}
          />}
         
          right={(props) => <Button {...props} mode="contained" style={styles.createBtn} onPress={() => {router.push('/safetytips'); }}>Create</Button>}

        />
        <Card.Content>
        <Surface style={styles.surface} elevation={0}>
        <Text variant="titleLarge">Security</Text>
        <Text variant="bodyMedium">Create and recover wallet with Face ID or fingerprint. This is done automatically with your device's passkey.</Text>

        </Surface>
        <Divider/>
        <Surface style={styles.surface} elevation={0}>
        <Text variant="titleLarge">Transactions</Text>
        <Text variant="bodyMedium">Transactions are available in 8 EVM networks (chains) currently, but complete in fewer, simpler steps.</Text>
        </Surface>

        <Divider/>
        <Surface style={styles.surface} elevation={0}>

        <Text variant="titleLarge">Fees</Text>
        <Text variant="bodyMedium">Pay network fee (gas) with any of our 200+ tokens. Regardless of the transaction network, you can pay this fee with any token that has enugh balance.</Text>

        </Surface>

        </Card.Content>
        {/* <Card.Actions>
          <Button>Cancel</Button>
          <Button onPress={() => alert('ok')}>Ok</Button>
        </Card.Actions> */}
      </Card>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createBtn: {
    margin: 10
  },
  cardTitle: {
    padding: 2
  },
  surface: {
    padding: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
