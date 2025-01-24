import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Link , useNavigation} from 'expo-router';

export default function DetailsScreen() {
//     const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({ headerShown: false });
//   }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Link href="/">back to home</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
