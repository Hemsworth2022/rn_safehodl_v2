import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { List, RadioButton, Text, Button, Avatar } from 'react-native-paper';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";

export default function QuickQuiz() {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [bottomSheetContent, setBottomSheetContent] = useState<any>(null)
  const router = useRouter(); // Initialize useRouter
  const sheetRef = useRef<BottomSheet>(null);
  const [isVisible, setIsVisible] = useState(false);

  const options = [
    { label: 'I can recover my wallet later', value: 'option1' },
    { label: "I'll lose access to my wallet and funds", value: 'option2' },
  ];

  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);


  const checkAnswer = () => {
    if (sheetRef.current) {
      if (selectedValue === 'option1') {
        setBottomSheetContent({
          isCorrect: false,
          description: 'Passkey is the key to your wallet. If passkey is deleted, you will lose access to your wallet.'
        })
      } else if (selectedValue === 'option2') {
        setBottomSheetContent({
          isCorrect: true,
          description: 'Passkey is the key to your wallet. If passkey is deleted, you will lose access to your wallet.'
        })
        // router.push('/bottomSheet')
      }
      sheetRef.current.expand(); // Open the bottom sheet
      setIsVisible(true);
    }

  }

  const closeBottomSheet = () => {
    setIsVisible(false);
    sheetRef?.current?.close();
    setTimeout(() => {
      if (selectedValue === 'option2') {
        router.push('/setWalletName')
      }  
    }, 100); 
  }
  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <View style={styles.container}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text variant="titleLarge"> What happens if passkey is deleted?</Text>
          <Text variant="bodyMedium">Choose the correct answer.</Text>
        </View>
        <View>
          {options.map((option, index) => (
            <List.Item
              key={option.value}
              style={styles.listItem}
              titleNumberOfLines={4}
              title={
                <Text style={styles.title} >
                  {option.label}
                </Text>
              }
              left={() => (
                <RadioButton
                  value={option.value}
                  status={selectedValue === option.value ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedValue(option.value)} // Update selected value
                />
              )}
            />
          ))}


          {/* Optionally, add a button to clear selection */}
          <Button mode="contained" onPress={checkAnswer} disabled={selectedValue === null} style={styles.button}>
            Check answer
          </Button>
        </View>
        <Button mode="contained" style={styles.linkBtn} labelStyle={styles.btnlabel}>
          What is Passkey?
        </Button>
      </View>
      {isVisible && (
        <TouchableWithoutFeedback onPress={() => null}>
          <View style={styles.blocker} />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChange}

        >
            {bottomSheetContent && bottomSheetContent.isCorrect && <Avatar.Icon size={84} icon="check" style={{margin: 'auto'}}/>}
            {bottomSheetContent && !bottomSheetContent.isCorrect &&  <Avatar.Icon size={84} icon="window-close" style={{margin: 'auto'}}/>}
            <Text variant="titleLarge" style={{textAlign: 'center'}}> {bottomSheetContent && bottomSheetContent.isCorrect ? `Correct!` : `OOPS. Wrong answer!.`}</Text>

          <Text variant="bodyMedium" style={{padding: 10}}>{bottomSheetContent?.description}</Text>
          <Button mode="contained" onPress={closeBottomSheet}  style={styles.button}>
          {bottomSheetContent && bottomSheetContent.isCorrect && `Got it. Continue`}
          {bottomSheetContent && !bottomSheetContent.isCorrect && `Try again`}
          </Button>
          <Button mode="contained" style={styles.linkBtn} labelStyle={styles.btnlabel}>
          Learn more about passkey
        </Button>
        </BottomSheet>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    height: '100%',
  },
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
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000046',  // Blocks the background without showing a backdrop
  },
  listItem: {
    flexDirection: 'row', // Ensures the list item is horizontally aligned
    alignItems: 'flex-start', // Align checkbox and text to the start
    paddingVertical: 10, // Optional: Adds space above and below the list item
    paddingHorizontal: 5, // Optional: Adds some horizontal padding for spacing
  },
  button: {
    margin: 'auto',
    width: '60%',
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
