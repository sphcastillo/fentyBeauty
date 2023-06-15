import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import products from "./src/data/products";

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        renderItem={({ item })  => (
          <View style={styles.itemContainer}>
            <Image 
              source={{ uri: item.image }}
              style={styles.image}
            />
          </View>
        )}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '50%',
    padding: 2,
  },
  image: {
    // width: "100%",
    aspectRatio: 1,

  }
});
