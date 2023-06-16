import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import products from '../data/products';

const ProductsScreen = () => {
    const navigation = useNavigation();
    return (
      <FlatList 
        data={products}
        renderItem={({ item })  => (
          <Pressable 
            onPress={() => {navigation.navigate("Product Details")}}
            style={styles.imageContainer}>
            <Image 
              source={{ uri: item.image }}
              style={styles.image}
            />
          </Pressable>
        )}
        numColumns={2}
      />
    )
}

const styles = StyleSheet.create({
    imageContainer: {
      width: '50%',
      padding: 1.1
    },
    image: {
      // height: "100%",
      // aspectRatio: 1,
      width: '100%',
      height: 240
    }
  });

  export default ProductsScreen;