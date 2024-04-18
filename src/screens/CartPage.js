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
import {useDispatch, useSelector} from 'react-redux';
import {
  addProducts,
  addQtyProducts,
  removeQtyProducts,
  updateProducts,
} from '../redux/MyProductSlice';
import {useNavigation} from '@react-navigation/native';

const CartPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.product.mycartList);

  // Function to calculate total price
function calculateTotalPrice(products) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price * products[i].qty;
    }
    return `Total Price: $${totalPrice}`;
}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[styles.buttonText, {marginRight: 10}]}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText}>MyCart</Text>
      </View>
      <Text>{calculateTotalPrice(cartCount)}</Text>
      <FlatList
        data={cartCount}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Image source={{uri: item.thumbnail}} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.heading}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.paragraph}>
                {item.description}
              </Text>
              <Text numberOfLines={1} style={styles.priceText}>{`₹${
                item.new_price || item.price
              }`}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable
                  onPress={() => {
                    dispatch(removeQtyProducts(item));
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{`-`}</Text>
                </Pressable>

                <Text
                  numberOfLines={1}
                  style={[
                    styles.priceText,
                    {paddingHorizontal: 10},
                  ]}>{`${item.qty}`}</Text>
                <Pressable
                  onPress={() => {
                    dispatch(addQtyProducts(item));
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{`+`}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default CartPage;

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
    width: '25%',
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
    // padding: 16,
    height: 50,
    alignItems: 'center',
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
