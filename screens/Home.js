import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';
import Header from "../components/Header";
import Hero from "../components/Hero"
import { getSectionListData, useUpdateEffect } from '../utils/index';
import { dropDatabase } from '../database';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['Starters', 'Mains', 'Deserts'];

const Item = ({ name, description, price, image }) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{name}</Text>
    <Text style={styles.itemDescription}>{description}</Text>
    <Text style={styles.itemPrice}>${price}</Text>
    <Image style={styles.itemImage} src={image}/>
  </View>
);

export default function Home() {
  const [data, setData] = useState([    {
    "name": "Greek Salad",
    "price": 12.99,
    "description": "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.",
    "image": "greekSalad.jpg",
    "category": "starters"
  },
  {
    "name": "Bruschetta",
    "price": 7.99,
    "description": "Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.",
    "image": "bruschetta.jpg",
    "category": "starters"
  },
  {
    "name": "Grilled Fish",
    "price": 20.00,
    "description": "Fantastic grilled fish seasoned with salt.",
    "image": "grilledFish.jpg",
    "category": "mains"
  },
  {
    "name": "Pasta",
    "price": 6.99,
    "description": "Delicious pasta for your delight.",
    "image": "pasta.jpg",
    "category": "mains"      
  },
  {
    "name": "Lemon Dessert",
    "price": 4.99,
    "description": "You can't go wrong with this delicious lemon dessert!",
    "image": "lemonDessert.jpg",
    "category": "desserts"      
  }]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {
    try {
      const response = await fetch(API_URL);
      console.log('response: ' + response)

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const menu = json.menu;
      console.log('json: ' + json)
      console.log(menu)
      // setData(menu)
      return  menu;
    } catch (error) {
      console.error(error.message);
      console.log(e.message)
    }
  }

  console.log(data)

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          const fetchedMenu = await fetchData();
          saveMenuItems(fetchedMenu);
          console.log(fetchedMenu);
        }
        //const sectionListData = getSectionListData(fetchedMenu);
        //setData(sectionListData);
       
      } catch (e) {
        // Handle error
        //Alert.alert(e.message);
        console.log(e.message)
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        
    //     return db.executeSql(`SELECT * FROM menuitems WHERE category IN (${categories}) ${title}`,
    //       activeCategories,
    //       (_, { rows }) => {
    //         resolve(rows._array);
    //       });
    // }).then(() => console.log('data filtered'))

      let array;

      const categoryFiltered = menuItems.filter(item => {
        activeCategories.map(cat => cat == item.category)
      });

      if(query.length > 0) {
        array = categoryFiltered.filter(item => item.indexOf(query) > 0);
      } else {
        array = categoryFiltered
      }


        setData(array);
        // setData(menuItems);
      } catch (e) {
        //Alert.alert(e.message);
        console.log(e.message)
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <ScrollView style={styles.container}>
      <Header avatarImage={true} />
      <Hero/>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="grey"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="#F4CE14"
        inputStyle={{ color: 'white' }}
        elevation={0}
      />
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SafeAreaView>

      <FlatList
      scrollEnabled={false}
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Item title={item.name} description={item.description} price={item.price} image={`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`} />
        )}
      />

      </SafeAreaView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    marginTop: '-30',
    marginBottom: 20,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight:600,
    color: 'black',
    paddingLeft: 20,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
    position: 'relative',
    width: '100%',
    paddingLeft: 20,
    height: 130,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 400,
    color: '#000',
    //backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',

  },
  itemDescription: {
    width: '60%',
    fontSize: 14,
    fontWeight: 300,
    paddingBottom: 5,
  },
  itemPrice: {
    fontWeight: 400,
  },
  itemImage: {
    height: '90',
    width: '100',
    resizeMode: "cover",
    //alignSelf: 'center',
    margin: 'auto',
    //marginRight: 20,
    borderRadius: 10,
    position: 'absolute',
    top: '15',
    right: '15'
  }


});
