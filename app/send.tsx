import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SendScreen = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    // user input details
    const [toAddress, setToAddress] = React.useState<string>('0xb87a472325C42BfC137499539C1A966Bce9ce10A');
    const [amount, setAmount] = React.useState<string>('');

    function handleNext() {
        console.log("Handle next is clicked")
        router.push({ 
            pathname: '/transfer',
            params:{toAddress:toAddress,amount:amount,currentAsset:params.currentAsset,balance:params.balance}

        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Address or Domain Name"
                value={toAddress}
                onChangeText={setToAddress}
                placeholder="Search or Enter"
                style={styles.input}
                right={<TextInput.Icon icon="contacts" />}

            />
            <TextInput
                mode="outlined"
                label="BNB Amount"
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                style={[styles.input]}

            />

            {/* <Button
          mode="contained"
          onPress={() => {}}
          style={styles.maxButton}
          compact
        >
          Max
        </Button> */}
            <Text style={styles.amountText}>≈ $0.00</Text>
            <Button mode="contained" style={styles.nextButton} onPress={handleNext} disabled={!(toAddress && amount && (Number(amount) <= Number(params.balance)))}>
                Next
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    maxButton: {
        marginLeft: 10,
    },
    amountText: {
        marginVertical: 10,
    },
    nextButton: {
        marginTop: 20,
    },
});

export default SendScreen;
