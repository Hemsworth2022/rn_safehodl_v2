import React,{useEffect,useState} from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation, Appbar, Avatar, TextInput, Searchbar,Button } from 'react-native-paper';
import HomeScreen from './HomeScreen';
import DiscoverScreen from './DiscoverScreen'
import { useRouter,useLocalSearchParams } from 'expo-router';

import {getEstimateAddress} from './logic/userInfo'

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!params.rawId || !params.x || !params.y) return;
    console.log('Fetching estimated address...', params.userName);

    const fetchContractAddress = async () => {
      try {
          const estimateAddress = await getEstimateAddress(params.rawId, [params.x, params.y]);
          console.log({estimateAddress});
          setAddress(estimateAddress);
      } catch (error) {
          console.error('Error fetching contract address:', error);
      }
    };
    fetchContractAddress();
  },[params.rawId]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon="cog" onPress={() => { router.push('/') }} />

        <View style={styles.titleContainer}>
          <Text style={styles.appbarTitle}>{params.userName}</Text>
        </View>

        <Appbar.Action icon="bell-circle" onPress={() => { }} />
      </Appbar.Header>

      <Searchbar
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode="bar"

      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }: any) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route?.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          key="home-1"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
              return <Avatar.Icon size={24} style={{ marginHorizontal: 5 }} icon="home" />;
            },
          }}
        />
        <Tab.Screen
          name="Discover"
          key="Discover-1"
          component={DiscoverScreen}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => {
              return <Avatar.Icon size={24} style={{ marginHorizontal: 5 }} icon="magnify-scan" />;
            },
          }}
        />
      </Tab.Navigator>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbar: {
    backgroundColor: 'white',
    elevation: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbarTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  sceneContainer: {
    flex: 1,  // This is critical: makes the content fill the available space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchInput: {
    borderRadius: 40,
    backgroundColor: '#6200ee33',
    paddingHorizontal: 16,
    margin: 10,
    fontSize: 16,
  },
});