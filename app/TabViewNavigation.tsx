import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar, List, MD3Colors } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Sample Data for tokens
const tokensData = [
  {
    "id": 1,
    "title": "ETH",
    "type": "COIN",
    "tokenAddress": "",
    "description": "Ethereum",
    "chainId":'0xaa36a7',
    "price": "$3,200",
    "percentageChange": "+1.25%",
    "icon": "tray-arrow-up",
    "color": MD3Colors.neutral70,
  },
  {
    "id": 2,
    "title": "TT",
    "tokenAddress": "0x6aFFb4A3a6cbb5C3c35fabEc497C81ca842b17D6",
    "type": "TOKEN",
    "description": "Toretto",
    "chainId":'0xaa36a7',
    "price": "$101,234",
    "percentageChange": "-0.14%",
    "icon": "tray-arrow-down",
    "color": MD3Colors.error30,
  },
  {
    "id": 3,
    "title": "POL",
    "type": "COIN",
    "tokenAddress":"",
    "description": "Amoy",
    "chainId":"0x13882",
    "price": "$0.89",
    "percentageChange": "-2.56%",
    "icon": "tray-arrow-down",
    "color": MD3Colors.error30,
  },
  {
    "id": 4,
    "title": "SAR",
    "type": "TOKEN",
    "tokenAddress": "0xF757Dd3123b69795d43cB6b58556b3c6786eAc13",
    "description": "Sarvy",
    "chainId":"0x13882",
    "price": "$120",
    "percentageChange": "+0.5%",
    "icon": "tray-arrow-up",
    "color": MD3Colors.neutral70,
  },
];

// First tab screen (Crypto data)
const FirstRoute = () => {
    const router = useRouter()
  return (
    <ScrollView style={styles.scene}>
      {tokensData.map((item) => (
        <List.Item
          key={`${item.id}-${item.title}`} // Ensure each item has a unique key
          style={styles.listItem}
          title={item.title}
          description={item.description}
          onPress={() => {
            router.push({
                pathname: '/cryptoDetails',
                params: { title: item.title, subtitle: `COIN | ${item.title} Smart Chain` , type:item.type, chain:item.chainId, tokenAddress:item.tokenAddress },
              });}}
          right={() => (
            <View>
              <Text>{item.price}</Text>
              <Text style={{ textAlign: 'right', color: item.color }}>
                {item.percentageChange}
              </Text>
            </View>
          )}
          left={() => <Avatar.Icon size={40} style={styles.avatar} icon={item.icon} />}
        />
      ))}
    </ScrollView>
  );
};

// Second tab screen (History)
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text style={styles.text}>History</Text>
  </View>
);

const TabViewNavigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Crypto' },
    { key: 'second', title: 'History' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={{ flex: 1, marginTop: 10}}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar} // Apply custom background color
            indicatorStyle={styles.indicator} // Custom tab indicator
            activeColor="black" // Active tab text color
            inactiveColor="#030303" // Inactive tab text color
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
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
  tabBar: {
    backgroundColor: 'white', // Custom background color for the tab bar
    elevation: 0, // Remove the shadow
    color: 'black'
  },
  indicator: {
    backgroundColor: 'black', // Custom color for the tab indicator (underline)
  },
});

export default TabViewNavigation;
