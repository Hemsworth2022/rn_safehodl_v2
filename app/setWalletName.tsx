import { useRouter } from "expo-router";
import React, { useCallback, useRef, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { TextInput, Button, HelperText, Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import {createPasskey,isPasskeySupported,toBackendFormat} from './logic/passkeys'
import {storePubkey} from './logic/userInfo'
import { parse } from "@babel/core";

const SetWalletName = () => {
  // hooks
  const [text, setText] = React.useState<any>("");

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to toggle loading indicator visibility
  const [modalVisible, setModalVisible] = useState(false); // State for modal (backdrop) visibility

  const router = useRouter();

  // Validate input (simple check for empty input)
  const handleSubmit = async() => {
    if (text.trim() === '') {
      setError('This field cannot be empty!');
    } else {
      setError('');
      // Submit form or perform any action
      console.log('Input submitted:', text);
      setLoading(!loading);  // Toggle the loading state
      setModalVisible(!modalVisible); // Show or hide the backdrop (modal)
      let passkeyData = await createPasskey(text);
      let publickDataJson:any;
      if (passkeyData) {
        const publickData = await toBackendFormat(passkeyData);
        publickDataJson = JSON.parse(publickData);
        const response = await storePubkey(text, publickDataJson['rawId'],publickDataJson['pubkeyCoordinates']['x'], publickDataJson['pubkeyCoordinates']['y'])
      }
      setTimeout(() => {
        // setModalVisible(!modalVisible); // Show or hide the backdrop (modal)
        // setLoading(!loading);  // Toggle the loading state  
        router.push({
          pathname: '/dashboard',
          params: { userName: text, rawId: publickDataJson['rawId'], x: publickDataJson['pubkeyCoordinates']['x'],  y: publickDataJson['pubkeyCoordinates']['y']},
        })
      }, 2000);
    }
  };
  const toggleLoading = () => {
    setLoading(!loading);  // Toggle the loading state
    setModalVisible(!modalVisible); // Show or hide the backdrop (modal)

  };
  return (
    // <PaperProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}

          <TextInput
            label="Wallet Name"
            mode="outlined"
            value={text}
            onChangeText={setText}
            style={styles.textInput}
            outlineStyle={{borderColor: 'black'}}
            contentStyle={{color: 'black'}}
          />
          <HelperText type="info" style={{color: 'black'}} >
            Wallet name should be between 4 to 24 characters
          </HelperText>

        {/* </ScrollView> */}

        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={text.length < 4 || text.length > 24}
          style={styles.button}
        >
          Submit
        </Button>
        <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={toggleLoading} // Close modal when back button pressed
      >
        <View style={styles.modalBackdrop}>
          {/* ActivityIndicator on the backdrop */}
          <ActivityIndicator animating={loading} color="green" size="large" />
        </View>
      </Modal>
      </KeyboardAvoidingView>
    // {/* </PaperProvider> */}
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  button1: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
  },
  container: {
    // flex: 1,
    // justifyContent: 'space-between', // Space between the input and button
    padding: 20
  },
  scrollViewContent: {
    flexGrow: 1,  // Ensures the ScrollView takes all available space but leaves space for the button
    justifyContent: 'flex-start',  // Ensure content starts from top
  },
  inputContainer: {
    flex: 1, // Allow the input container to take available space
    // justifyContent: 'center',
  },
  textInput: {
    marginBottom: 8,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 10,
    // backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'black'
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default SetWalletName;