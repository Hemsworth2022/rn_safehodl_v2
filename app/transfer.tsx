import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSecureStore } from "../hooks/useSecurePasskey";
import { ACCOUNT_ADDRESS_STORAGE_KEY } from "../hooks/useSecurePasskey";
import { useLocalSearchParams } from 'expo-router';

const TransferPage: React.FC = () => {
  const { data: address } = useSecureStore(ACCOUNT_ADDRESS_STORAGE_KEY);
  const {toAddress,amount,currentAsset,balance} = useLocalSearchParams();
   const currentAssetJson = JSON.parse(currentAsset.toString());
  const handleSubmit = () => {
    console.log("Submit button pressed!");
    console.log(currentAssetJson.tokenAddress);
    console.log(currentAssetJson.type);
    // Add your submit functionality here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Transfer Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{amount} {currentAssetJson.title}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Asset:</Text>
        <Text style={styles.value}>{currentAssetJson.title}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>From Address:</Text>
        <Text style={styles.value}>{address}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>To Address:</Text>
        <Text style={styles.value}>{toAddress}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Network Fee:</Text>
        <Text style={styles.value}>10</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Start the content at the top, allowing space for the button
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,  // Shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,  // Shadow for iOS
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',  // Green button color
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default TransferPage;