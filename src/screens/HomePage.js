import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addPosts, setPostList } from '../redux/PostSlice';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomePage = () => {
  const [postData,setPostData]= useState(postList);
  const dispatch = useDispatch();
  const postList = useSelector(state => state.postlist.postList);

  async function fetchApiData() {
    try {
      const apiUrl = 'https://dummyjson.com/posts';

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error.message);
      // Return null or throw the error to handle it in the calling code
      return null;
    }
  }


  useEffect(() => {
    fetchApiData()
      .then(data => {
        // for (let index = 1; index <= data.posts.length; index++) {

        //   dispatch(addPosts(data.posts[index]));
        // }
        dispatch(setPostList(data.posts))
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching data:', error.message);
      });
  }, []);
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={postList}
          renderItem={({item}) => <Item title={item?.title} />}
          keyExtractor={(item,index) => index}
        />
      </SafeAreaView>
   
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
