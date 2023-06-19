import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import products from '../data/products';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/productsSlice';

const ProductsScreen = () => {
    const navigation = useNavigation();

    const products = useSelector((state) => state.products.products);

    const dispatch = useDispatch();


    return (
      <FlatList 
        data={products}
        renderItem={({ item })  => (
          <Pressable 
            onPress={() => {
              dispatch(productsSlice.actions.setSelectedProduct(item.id))
              navigation.navigate("Product Details")
            }}
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