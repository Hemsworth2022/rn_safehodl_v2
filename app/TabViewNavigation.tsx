import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar, List, MD3Colors } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Sample Data for tokens
const tokensData = [
  {
    "id": 1,
    "title": "BDX",
    "description": "Bitcoin",
    "price": "$101,234",
    "percentageChange": "-0.14%",
    "icon": "tray-arrow-down",
    "color": MD3Colors.error30,
  },
  {
    "id": 2,
    "title": "ETH",
    "description": "Ethereum",
    "price": "$3,200",
    "percentageChange": "+1.25%",
    "icon": "tray-arrow-up",
    "color": MD3Colors.neutral70,
  },
  {
    "id": 3,
    "title": "XRP",
    "description": "Ripple",
    "price": "$0.89",
    "percentageChange": "-2.56%",
    "icon": "tray-arrow-down",
    "color": MD3Colors.error30,
  },
  {
    "id": 4,
    "title": "LTC",
    "description": "Litecoin",
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
                params: { title: item.title, subtitle: `COIN | ${item.title} Smart Chain` },
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
