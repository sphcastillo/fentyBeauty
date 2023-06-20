import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';
import products from "../data/products";
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';

const ProductDetailsScreen = () => {
    const product = useSelector((state) => state.products.selectedProduct);
    const dispatch = useDispatch();

    const { width } = useWindowDimensions();

    const addToCart = () => {
        dispatch(cartSlice.actions.addCartItem({ product }));
    }

    return(
        <View>
            <ScrollView>
                <FlatList 
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={{ width: width, aspectRatio: 1 }}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                <View style={{ padding: 20, paddingBottom: 100 }}>
                    <Text  style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            <Pressable onPress={addToCart} style={styles.button}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 27,
        fontWeight: '500',
        marginVertical: 10
    },
    price: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 1.5
    },
    description: {
        marginVertical: 10,
        fontSize: 13,
        lineHeight: 30,
        fontWeight: '300'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: '500',
        fontSize: 16
    },
});

export default ProductDetailsScreen;