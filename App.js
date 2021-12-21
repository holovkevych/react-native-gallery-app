import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './components/Styles';
import { Text, View, FlatList, SafeAreaView, Image, TextInput, Button, Icon, } from 'react-native';

const Tab = createBottomTabNavigator();
const URL = 'https://jsonplaceholder.typicode.com/photos?albumId=1';

function PhotosScreen() {
  const [dataSource, setDataSource] = useState([]);
  const [liked, setLiked] = useState(false);
  const [favs, setFavs] = useState([]);

  useState(() => {
    fetch(URL)
      .then((resp) => resp.json())
      .then(function (data) {
        let items = data;

        setDataSource(items);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.input} placeholder="Search..." />
      </View>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 3 }}>
            <Image
              style={styles.imageThumbnail}
              source={{ uri: item.thumbnailUrl }}
            />
            <View>
              <Pressable id={item.id} onPress={(newIMG) => {
                  newIMG = item.id;
                  if (liked === false) {
                    return (
                      setLiked((isLiked) => !isLiked),
                      favs.push(newIMG),
                      favs,
                      FavoritesScreen(favs)
                  )
                    } else {
                        let delArray = []
                        return (
                          setLiked((isLiked) => !isLiked),
                          delArray = favs.filter((element) => element !== newIMG),
                          console.log(delArray),
                          FavoritesScreen(delArray)
                      )
                  }
                }}>
                <MaterialCommunityIcons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={20}
                  style={{
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}
                  color={liked ? 'red' : 'black'}
                />
              </Pressable>
              <Text style={styles.imageTitle}>
                ({item.id}) {item.title}
              </Text>
            </View>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

function FavoritesScreen(someID = []) {
  console.log(` fav screen ${someID}`)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your list is empty</Text>
    </View>
  );
}

const MyTabs = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {}, [photos]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Photos" component={PhotosScreen}></Tab.Screen>

      <Tab.Screen name="Favorites" component={FavoritesScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
