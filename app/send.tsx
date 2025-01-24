import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SendScreen = () => {
    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Address or Domain Name"
                placeholder="Search or Enter"
                style={styles.input}
                right={<TextInput.Icon icon="contacts" />}

            />
            <TextInput
                mode="outlined"
                label="BNB Amount"
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
            <Button mode="contained" style={styles.nextButton} disabled>
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
