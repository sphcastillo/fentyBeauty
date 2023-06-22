import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import products from '../data/products';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductsScreen = () => {
    const navigation = useNavigation();

    // const products = useSelector((state) => state.products.products);

    const dispatch = useDispatch();

    const { data, isLoading, error } = useGetProductsQuery();

    if(isLoading){
      return <ActivityIndicator />;
    }
    if(error){
      return <Text>Error fetching products: {error.error}</Text>;
    }

    // console.log("data: ", data);

    const products = data.data;


    return (
      <FlatList 
        data={products}
        renderItem={({ item })  => (
          <Pressable 
            onPress={() => {
              // dispatch(productsSlice.actions.setSelectedProduct(item.id))
              navigation.navigate("Product Details", { id: item._id })
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