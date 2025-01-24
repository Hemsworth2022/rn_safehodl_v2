import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Checkbox, Text, Button } from 'react-native-paper';
import { Link , useNavigation, useRouter} from 'expo-router';

export default function SafetyTips() {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const router = useRouter(); // Initialize useRouter

  // List of options
  const options = [
    { label: 'Once SafeHodl wallet is created, passkey info (fingerprint, face recognition) will auto-sync on your Google account.', value: 'option1' },
    { label: 'Passkeys allow you to recover the wallet in future, if your device is lost or replaced.', value: 'option2' },
    { label: 'IMPORTANT: If passkey is deleted, you will lose access to the wallet and all funds.', value: 'option3' },
  ];

  // Function to handle checkbox selection/deselection
  const handleCheckboxToggle = (value: any) => {
    setSelectedValues((prevSelected: any) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item: any) => item !== value) // Deselect
        : [...prevSelected, value] // Select
    );
  };

  // Display selected values as a string
  const selectedString = selectedValues.join(', ') || 'None';

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Text variant="titleLarge"> Passkey is the key to your wallet.</Text>
        <Text variant="bodyMedium">Tap on all checkboxes to confirm you understand the importance of passkeys.</Text>
      </View>
      <View>
        {options.map((option, index) => (
          <List.Item
            key={option.value}
            style={styles.listItem}
            onPress={() => handleCheckboxToggle(option.value)} // Toggle checkbox state
            titleNumberOfLines={4}
            title={
              <Text style={styles.title} >
                {option.label}
              </Text>
            }
            left={() => (
              <Checkbox
                status={selectedValues.includes(option.value) ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(option.value)} // Toggle checkbox state
              />
            )}
          />
        ))}


        {/* Optionally, add a button to clear selection */}
        <Button mode="contained" onPress={() => { router.push('/quickQuiz')}} disabled={selectedValues.length != 3} style={styles.button}>
          Continue
        </Button>
      </View>
      <Button mode="contained" style={styles.linkBtn} labelStyle={styles.btnlabel}>
        What is Passkey?
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  linkBtn: {
    margin: 20,
    backgroundColor: 'transparent'
  },
  btnlabel: {
    color: 'green',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 500
  },
  selectedText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  listItem: {
    flexDirection: 'row', // Ensures the list item is horizontally aligned
    alignItems: 'flex-start', // Align checkbox and text to the start
    paddingVertical: 10, // Optional: Adds space above and below the list item
    paddingHorizontal: 5, // Optional: Adds some horizontal padding for spacing
  },
  button: {
    marginTop: 20,
  },
  title: {
    flex: 1, // Allow text to take up the remaining space
    fontSize: 16,
    lineHeight: 22, // Optional, for better line spacing
    flexWrap: 'wrap', // Ensure text wraps when necessary
    marginLeft: 10, // Space between checkbox and text
    textAlign: 'left', // Align text to the left
  },
});
