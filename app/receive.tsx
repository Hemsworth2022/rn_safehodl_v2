import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import { Button, IconButton, MD3Colors, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function ReceiveScreen() {
  const address = "0x8afB15D3797d9648c4c14a5A64C7b5FddcacA99F";

  return (
    <View style={styles.container}>
      {/* Warning Message */}
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          Only send <Text style={styles.warningBold}>BNB Smart Chain (BNB)</Text> assets to this address. Other assets will be lost forever.
        </Text>
      </View>

      {/* QR Code and Address */}
      <View style={styles.qrContainer}>
        <Text style={styles.tokenTitle}>BNB</Text>
        <QRCode value={address} size={150} />
        <Text style={styles.address}>{address}</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 10 }}>
          <View style={{ width: 60 }}>
            <IconButton
              icon="content-copy"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Copy</Text>
          </View>
          <View style={{ width: 100, alignContent: 'center', alignItems: 'center' }}>
            <IconButton
              icon="cash"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Set Amount</Text>
          </View>
          <View style={{ width: 60 }}>
            <IconButton
              icon="share-variant"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Share</Text>
          </View>
        </View>

      {/* Deposit from Exchange */}
      <View style={styles.depositBox}>
        <Text style={styles.depositText}>Deposit from exchange</Text>
        <Text style={styles.depositSubText}>By direct transfer from your account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  warningBox: {
    backgroundColor: '#aaaaaa50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    color: 'orange',
    fontSize: 14,
    textAlign: 'center',
  },
  warningBold: {
    fontWeight: 'bold',
    color: 'orange',
  },
  qrContainer: {
    alignItems: 'center',
    marginHorizontal: 'auto',
    width: '70%',
    backgroundColor: '#aaaaaa50',
    borderRadius: 20
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  address: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginTop: 12,
    padding: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 12,
  },
  depositBox: {
    alignItems: 'center',
    marginTop: 16,
  },
  depositText: {
    color: '#00FF00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  depositSubText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});
