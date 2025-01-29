import React ,{ useState ,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSecureStore } from "../hooks/useSecurePasskey";
import { ACCOUNT_ADDRESS_STORAGE_KEY, PASSKEY_STORAGE_KEY } from "../hooks/useSecurePasskey";
import { useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import Web3, { HexString } from 'web3'; // Ensure Web3.js is correctly imported

import { feeTokens } from '../token/feeTokens';
import { coinList } from "../token/coinList";
import {createUserOpETHTx, createUserOpERC20Tx,UserOperation,getUserOperationByHash} from './logic/txCreation'

const TransferPage: React.FC = () => {
    const { data: address } = useSecureStore(ACCOUNT_ADDRESS_STORAGE_KEY);
    const { data: passkeyData } = useSecureStore(PASSKEY_STORAGE_KEY);
    const {toAddress,amount,currentAsset,balance} = useLocalSearchParams();
    const currentAssetJson = JSON.parse(currentAsset.toString());

    const [open, setOpen] = useState<boolean>(false); // State to control the dropdown open/close
    const [feeType, setFeeType] = useState<string>('Amoy'); // Default currency
    const [feeAsset, setFeeAsset] = useState<{ name: string; symbol: string; type: string; decimals: number; address: string }>();


    // Transaction(userOp) details
    const [errorMessage, setErrorMessage] = useState<String>('');
    const [aproxFee, setAproxFee] =  useState<string>('');
    const [isBalanceOk, setIsBalanceOk] = useState<boolean>(false);
    const [userOp, setUserOp] = useState<UserOperation>();

    //Chose feeAsset
    useEffect(() => {
        console.log('feeType',feeType);
        if(!feeType) return;
        
        const filteredTokens = feeTokens['Amoy'];
        const token = filteredTokens.find(token => token.name === feeType);
        console.log('feeAsset',token);
        setFeeAsset(token);
    },[feeType])

    // calculate aprox fees
    useEffect(()=>{
        console.log('next useEffect is called',feeType,feeAsset,address,toAddress)
        if(!feeAsset || !address || !toAddress || !passkeyData) return;
        // console.log('next useEffect is called',feeType,feeAsset)
        setAproxFee('');
        setUserOp(undefined);
        console.log(feeAsset);
        if(!feeAsset)
            return;
        let response:any = '';
        const web3: Web3 = new Web3('https://bundler.beldex.dev/rpc');
        const passkeyDataJson = JSON.parse(passkeyData);
        const getUserOperation = async () => {
            if (currentAssetJson.type === 'COIN') {
                console.log('Native coin userOp generation......... fee', feeType);
                const sendAmount = web3.utils.toWei(Number(amount), 'ether');
                response = await createUserOpETHTx(web3, address, passkeyDataJson.rawId, [passkeyDataJson.pubkeyCoordinates.x,passkeyDataJson.pubkeyCoordinates.y], toAddress.toString(), parseFloat(sendAmount) || 0, feeAsset);
                console.log(response);

            }
            else{
                console.log('ERC20 userOp generation......... fee', feeType);
                const alltoken = coinList['Amoy'];
                const token = alltoken.find(token => token.symbol === currentAssetJson.title);
                if(!token){
                    console.error('unsupport coin from list')
                    return;
                }
                const sendToken = web3.utils.toWei(Number(amount), token.decimals);
                response = await createUserOpERC20Tx(web3, address, passkeyDataJson.rawId, [passkeyDataJson.pubkeyCoordinates.x,passkeyDataJson.pubkeyCoordinates.y], token.address, toAddress.toString(),  parseFloat(sendToken) || 0, feeAsset);
                console.log(response);
            }

            if(!response.error)
            {
                setAproxFee(response?.requiredFee);
                setUserOp(response?.userOp);
                console.log((Number(amount) + Number(response?.requiredFee)), balance)
                if(currentAssetJson?.title === feeAsset.symbol){
                    if(balance && ((Number(amount) + Number(response?.requiredFee)) <= Number(balance)))
                        setIsBalanceOk(true);
                }else{
                    if(balance && (Number(amount)) <= Number(balance))
                        setIsBalanceOk(true);
                }
            }else{
                setAproxFee('');
                setUserOp(undefined);
                console.error(response.message);
            }
        }

        getUserOperation();
    },[feeAsset,address,passkeyData]);
    
  const handleSubmit = async() => {
    console.log("Submit button pressed!");
    console.log(currentAssetJson.tokenAddress);
    console.log(currentAssetJson.type);
    console.log(feeType);
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
        <Text style={styles.value}>{aproxFee} {feeAsset?.symbol}</Text>
      </View>
      {/* Currency Dropdown */}
      <View style={styles.card}>
        <Text style={styles.label}>Select Currency:</Text>
        <DropDownPicker
          open={open} // Controls whether the dropdown is open
          value={feeType} // Current selected value
          items={[
            { label: 'POL', value: 'Amoy' },
            { label: 'SAR', value: 'Sarvy' },
          ]}
          setOpen={setOpen} // Function to toggle the dropdown open/close
          setValue={setFeeType} // Function to set the selected currency
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!(aproxFee && userOp && isBalanceOk)}>
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