
import { Text, BottomNavigation, Appbar, Avatar, IconButton, Provider as PaperProvider, Button, Icon, MD3Colors, Divider, Provider, List } from 'react-native-paper';
import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomDrawer from './BottomDrawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TradeChart from './TradeChart';

import { useSecureStore } from "../hooks/useSecurePasskey";
import { ACCOUNT_ADDRESS_STORAGE_KEY, HISTORY_STORAGE_KEY } from "../hooks/useSecurePasskey";
import { fetchBalance, fetchERC20Balance } from './logic/userInfo'

const CryptoDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { data: address } = useSecureStore(
    ACCOUNT_ADDRESS_STORAGE_KEY
  );
  const [balance, setBalance] = React.useState<number>(0);

  // History for the user
  const [hisData, setHisData] = React.useState<any[]>([]);
  const [historyKey, setHistoryKey] = React.useState(HISTORY_STORAGE_KEY);
  const { data: historyData, loadData: loadHistoryData } = useSecureStore(historyKey);

  //Fetching the balance
  React.useEffect(() => {
    // console.log('fetching balance for user address',address,params.tokenAddress)
    if (!address || !params) return;

    const balance = async (address: string) => {
      var fetchedBalance = 0;
      if (params.type === "COIN")
        fetchedBalance = await fetchBalance(address);
      else
        fetchedBalance = await fetchERC20Balance(address, Array.isArray(params.tokenAddress) ? params.tokenAddress[0] : params.tokenAddress);

      setBalance(fetchedBalance);
      console.log({ fetchedBalance });
    };

    balance(address);  // Fetch conBalance immediately on address change

    // Start the interval to fetch conBalance every 5 seconds
    const intervalId = setInterval(() => {
      balance(address);
    }, 10000);  // Set interval for conBalance updates

    // Cleanup interval on address change or component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address, params]);

  // Update history key and load history data
  React.useEffect(() => {
    if (address) {
      const newHistoryKey = `${HISTORY_STORAGE_KEY}_${address}`;
      setHistoryKey(newHistoryKey);
    }
  }, [address]);

  React.useEffect(() => {
    console.log('loading History for ', historyKey)
    loadHistoryData();
  }, [historyKey]);
  React.useEffect(() => {
    if(historyData) {
      console.log('historyData ', JSON.parse(historyData))
      setHisData(JSON.parse(historyData))
    }
  }, [historyData]);

  const handleHistory = async () => {
    console.log('historykey is', historyKey)
    console.log('hisotry is ', historyData)
  }

  const openHashTransaction = (hash: string) => {
    // construct the url
    Linking.openURL(`https://amoy.polygonscan.com/tx/${hash}`).catch((err) =>
      console.error('Failed to open URL:', err)
    );

  }

  return (
    <View style={styles.wrappercontainer}>
      <View style={styles.container}>
        <View style={{ margin: 5, backgroundColor: '#f3f3f3', borderRadius: 10, width: 'auto', height: 100, borderStyle: 'solid', borderColor: '#333', borderWidth: 1 }}>
          <Text variant='titleLarge' style={{ textAlign: 'center', paddingTop: 20 }}>{params.title}</Text>
          <Text variant='titleMedium' style={{ textAlign: 'center', paddingTop: 4, fontWeight: 500 }}>{balance}</Text>

        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
          <View style={{ width: 60 }}>
            <IconButton
              icon="arrow-up-thin"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
              onPress={() => router.push({
                pathname: "/send",
                params: { balance: balance.toString(), currentAsset: JSON.stringify(params) }
              })}
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Send</Text>
          </View>
          <View style={{ width: 60 }}>
            <IconButton
              icon="arrow-down-thin"
              iconColor={MD3Colors.primary0}
              animated={true}
              size={30}
              mode="contained-tonal"
              onPress={() => router.push('/receive')}
            />
            <Text variant='labelLarge' style={{ textAlign: 'center' }}>Receive</Text>
          </View>
        </View>
        <Divider bold={true} />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 500, padding: 5 }}>
            Recent Activities:
          </Text>
          <List.Section>
          {hisData && hisData.length > 0  && hisData.map((data: any) => <List.Item
              style={{ backgroundColor: '#03030305', marginHorizontal: 15, borderRadius: 2, borderWidth:0.2 }}
              // left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="shield-edit-outline" />}

              // right={() => <IconButton
              //   icon="chevron-right"
              //   size={25}
              //   style={{ margin: 0 }}
              // />}
              key={data}
              onPress={() => openHashTransaction(data)}

              title={data} />)}
          </List.Section>
        </View>
        {/* <View style={{ flex: 1, height: '100%' }}></View>
        <Button mode="contained" style={{ width: 150 }} onPress={handleHistory}>
          History
        </Button>*/}
      </View> 
      <BottomDrawer title={params.title} />
    </View>

  );
}

const styles = StyleSheet.create({
  wrappercontainer: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1,
    padding: 5,
    height: '100%'
  }, customButton: {
    width: 80,
    borderRadius: 60,
    // paddingVertical: 10,
    marginBottom: 15,
    justifyContent: 'center', // Vertically center the button content
  },
  buttonContent: {
    alignItems: 'center', // Center everything inside the button
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center', // Ensure text is centered
  },
  icon: {
    marginTop: 8, // Add some space between the text and the icon
  },
});

export default CryptoDetails;
