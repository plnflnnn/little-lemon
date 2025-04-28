import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import Filters from '../components/Filters';
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useSQLiteContext } from 'expo-sqlite';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const sections = ['Starters', 'Mains', 'Desserts'];

const Item = ({ name, description, price, image }) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{name}</Text>
    <Text numberOfLines={2} style={styles.itemDescription}>{description}</Text>
    <Text style={styles.itemPrice}>${price}</Text>
    <Image
      style={styles.itemImage}
      source={{ uri: image }}
    />
  </View>
);

export default function Home() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));
  const db = useSQLiteContext();

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const json = await response.json();
      return json.menu;
    } catch (error) {
      console.error('fetchData error:', error.message);
      throw error;
    }
  };

  const getMenuItems = async () => {
    try {
      return await db.getAllAsync('SELECT * FROM menuitems');
    } catch (e) {
      console.error('getMenuItems error:', e.message);
      return [];
    }
  };

  const saveMenuItems = async (menuItems) => {
    try {
      await db.execAsync(`
        INSERT INTO menuitems (name, price, category, description, image)
        VALUES ${menuItems.map(item =>
          `('${item.name.replace("'", "''")}', '${item.price}', '${item.category}', '${item.description.replace("'", "''")}', '${item.image}')`
        ).join(', ')};
      `);
    } catch (e) {
      console.error('saveMenuItems error:', e.message);
    }
  };

  const filterByQueryAndCategories = async (query, activeCategories) => {
    try {
      let whereClause = '';

      if (activeCategories.length && !activeCategories.includes('All')) {
        const categoryConditions = activeCategories
          .map(cat => `category = '${cat.toLowerCase()}'`)
          .join(' OR ');
        whereClause += `(${categoryConditions})`;
      }

      if (query) {
        if (whereClause) whereClause += ' AND ';
        whereClause += `name LIKE '%${query}%'`;
      }

      const sql = whereClause ? `SELECT * FROM menuitems WHERE ${whereClause}` : `SELECT * FROM menuitems`;
      return await db.getAllAsync(sql);
    } catch (e) {
      console.error('filter error:', e.message);
      return [];
    }
  };

  const createDb = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menuitems (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          price DECIMAL(10,2),
          category TEXT,
          description TEXT,
          image TEXT
        );
      `);

      const existingItems = await getMenuItems();
      if (!existingItems.length) {
        const menu = await fetchData();
        await saveMenuItems(menu);
      }
    } catch (e) {
      console.error('createDb error:', e.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createDb();
        const menuItems = await getMenuItems();
        setData(menuItems);
      } catch (e) {
        Alert.alert('Error', e.message);
      }
    })();
  }, []);

  const handleFilter = useCallback(async () => {
    const activeCategories = sections.filter((s, i) => {
      if (filterSelections.every(sel => !sel)) return true;
      return filterSelections[i];
    });

    try {
      const items = await filterByQueryAndCategories(query, activeCategories);
      setData(items);
    } catch (e) {
      console.error('handleFilter error:', e.message);
    }
  }, [filterSelections, query]);

  useEffect(() => {
    handleFilter();
  }, [filterSelections, query, handleFilter]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  useEffect(() => {
    return () => {
      debouncedLookup.cancel();
    };
  }, [debouncedLookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = (index) => {
    setFilterSelections(prev => {
      const updated = [...prev];
      updated[index] = !prev[index];
      return updated;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header avatarImage screen="Home"/>
      <Hero />
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
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              description={item.description}
              price={item.price}
              image={`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}
            />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    marginTop: -30,
    marginBottom: 20,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 20,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: 20,
    height: 90,
    marginBottom: 30,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  itemDescription: {
    width: '60%',
    fontSize: 14,
    fontWeight: '300',
  },
  itemPrice: {
    fontWeight: '400',
  },
  itemImage: {
    height: 90,
    width: 100,
    resizeMode: 'cover',
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 10,
  },
});
