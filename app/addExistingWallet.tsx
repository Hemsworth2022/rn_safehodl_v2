import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Avatar, Card, Button, Text, Divider, List, MD3Colors, IconButton } from 'react-native-paper';

export default function AddExistingWallet() {
  //     const navigation = useNavigation();
  const router = useRouter(); // Initialize useRouter

  return (
    <View style={styles.container}>
      <View>
        <List.Section>
          <List.Item
            style={{ backgroundColor: '#03030330', marginHorizontal: 15, marginVertical: 5, borderRadius: 8 }}
            left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="shield-edit-outline" />}

            right={() => <IconButton
              icon="chevron-right"
              size={25}
              style={{ margin: 0 }}
            />}
            onPress={() => router.push('/setWalletName')}
            title="SafeHodl" description="Use face ID or fingerprint" />
          <List.Item
            style={{ backgroundColor: '#03030330', marginHorizontal: 15, marginVertical: 5, borderRadius: 8 }}
            title="Google Drive Backup"
            description="Restore from Google Drive backup"
            right={() => <IconButton
              icon="chevron-right"
              size={25}
              style={{ margin: 0 }}
            />}
            onPress={() => router.push('/setWalletName')}
            left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="star-four-points" />}
          />
            <List.Item
            style={{ backgroundColor: '#03030330', marginHorizontal: 15, marginVertical: 5, borderRadius: 8 }}
            title="View-only wallet"
            description="Observe or track assets of other wallets"
            right={() => <IconButton
              icon="chevron-right"
              size={25}
              style={{ margin: 0 }}
            />}
            onPress={() => router.push('/setWalletName')}
            left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="tray-arrow-down" />}

          />
        </List.Section>
      </View>
      <Text variant="titleSmall" style={{ textAlign: 'center', padding: 20 }}>You can create another wallet at anytime under 'Manage Wallet'</Text>

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
    listItem: {
      backgroundColor: '#03030330', // Semi-transparent background
      marginHorizontal: 15,
      marginVertical: 5,
      borderRadius: 8,
    },
    avatar: {
      marginHorizontal: 5,
    },
  });