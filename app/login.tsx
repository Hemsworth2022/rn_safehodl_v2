import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Avatar, Card, Button, Text, Divider, List, MD3Colors, IconButton } from 'react-native-paper';

export default function Login() {
  //     const navigation = useNavigation();
  const router = useRouter(); // Initialize useRouter

  const tokensData = [
    {
      "id": 1,
      "title": "BDX",
      "description": "Bitcoin",
      "price": "$101,234",
      "percentageChange": "-0.14%",
      "icon": "tray-arrow-down",
      "color": MD3Colors.error30 // You can use any color code you like
    },
    {
      "id": 2,
      "title": "ETH",
      "description": "Ethereum",
      "price": "$3,200",
      "percentageChange": "+1.25%",
      "icon": "tray-arrow-up",
      "color": MD3Colors.neutral70
    },
    {
      "id": 3,
      "title": "XRP",
      "description": "Ripple",
      "price": "$0.89",
      "percentageChange": "-2.56%",
      "icon": "tray-arrow-down",
      "color": MD3Colors.error30
    },
    {
      "id": 4,
      "title": "LTC",
      "description": "Litecoin",
      "price": "$120",
      "percentageChange": "+0.5%",
      "icon": "tray-arrow-up",
      "color": MD3Colors.neutral70
    }
  ];
  
  
  return (
    <View style={styles.container}>
      <View>
        <Text variant="titleLarge" style={{ textAlign: 'center', padding: 20 }}>Join 70M+ people shaping the future of the internet with us</Text>
        <List.Section>
          <List.Item
            style={{ backgroundColor: '#03030330', marginHorizontal: 15, marginVertical: 5, borderRadius: 8 }}
            left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="star-four-points" />}
            right={() => <IconButton
              icon="chevron-right"
              size={25}
              style={{ margin: 0 }}
            />}
            onPress={() => router.push('/createWallet')}
            title="Create new wallet" description="Secret pharse or SafeHodl wallet" />
          <List.Item
            style={{ backgroundColor: '#03030330', marginHorizontal: 15, marginVertical: 5, borderRadius: 8 }}
            title="Add existing wallet"
            description="Import, restore or view-only"
            right={() => <IconButton
              icon="chevron-right"
              size={25}
              style={{ margin: 0 }}
            />}
            onPress={() => router.push('/addExistingWallet')}
            left={() => <Avatar.Icon size={40} style={{ marginHorizontal: 5 }} icon="tray-arrow-down" />}

          />
        </List.Section>
      </View>
      <View>
        <Text variant="titleLarge" style={{ textAlign: 'left', padding: 20 }}>Popular Tokens</Text>
        {tokensData.map((item) => (
        <List.Item
          key={item.id}  // Ensure each item has a unique key
          style={styles.listItem}
          title={item.title}
          description={item.description}
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
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createBtn: {
    margin: 10
  },
  cardTitle: {
    padding: 2
  },
  surface: {
    padding: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
});
