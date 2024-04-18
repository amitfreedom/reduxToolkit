import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addProducts} from '../redux/MyProductSlice';
import CartPage from './CartPage';

const ProductPage = () => {
    const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.product.mycartList);

  let productList = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      brand: 'Apple',
      thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      qty: 1,
    },
    {
      id: 2,
      title: 'iPhone X',
      description:
        'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
      price: 899,
      brand: 'Apple',
      thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
      qty: 1,
    },
    {
      id: 3,
      title: 'Samsung Universe 9',
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      brand: 'Samsung',
      thumbnail: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
      qty: 1,
    },
    {
      id: 4,
      title: 'OPPOF19',
      description: 'OPPO F19 is officially announced on April 2021.',
      price: 280,
      brand: 'OPPO',
      thumbnail: 'https://cdn.dummyjson.com/product-images/4/thumbnail.jpg',
      qty: 1,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.buttonText}>Redux Demo</Text>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("CartPage");
        }}>
        <Text style={[styles.buttonText]}>{`Cart(${cartCount?.length})`}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productList}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Image source={{uri: item.thumbnail}} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.heading}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.paragraph}>
                {item.description}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.priceText}>{`₹${item.price}`}</Text>
              <Pressable
                onPress={() => {
                  dispatch(addProducts(item));
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>{`Add To Cart`}</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
    width: '65%',
    zIndex: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 16,
    height: 50,
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    margin: 10,
    flexDirection: 'row',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 3,
    color: 'green',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    lineHeight: 24,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 24,
  },
  infoContainer: {
    flex: 3,
    alignContent: 'center',
    paddingLeft: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 80,
    borderRadius: 5,
  },
});
