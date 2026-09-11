import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Constants from 'expo-constants';
import { useSQLiteContext } from 'expo-sqlite';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Hero from '../components/Hero';
import {
  MENU_CATEGORIES,
  filterMenuItems,
  getMenuImageUrl,
  seedMenuIfEmpty,
} from '../database/menu';
import { colors } from '../theme/colors';

const Item = ({ name, description, price, image }) => (
  <View style={styles.item}>
    <View style={styles.itemCopy}>
      <Text style={styles.itemName}>{name}</Text>
      <Text numberOfLines={2} style={styles.itemDescription}>
        {description}
      </Text>
      <Text style={styles.itemPrice}>${price}</Text>
    </View>
    <Image style={styles.itemImage} source={{ uri: image }} />
  </View>
);

function getActiveCategories(selections) {
  const noneSelected = selections.every((selected) => !selected);
  if (noneSelected) {
    return [];
  }
  return MENU_CATEGORIES.filter((_, index) => selections[index]);
}

export default function Home() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    MENU_CATEGORIES.map(() => false)
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const db = useSQLiteContext();

  const loadMenu = useCallback(async () => {
    await seedMenuIfEmpty(db);
    return filterMenuItems(db, query, getActiveCategories(filterSelections));
  }, [db, filterSelections, query]);

  useEffect(() => {
    loadMenu()
      .then((items) => {
        setError(null);
        setData(items);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadMenu]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const items = await loadMenu();
      setError(null);
      setData(items);
    } catch (e) {
      setError(e.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(searchBarText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchBarText]);

  const handleFiltersChange = useCallback((index) => {
    setFilterSelections((prev) => {
      const updated = [...prev];
      updated[index] = !prev[index];
      return updated;
    });
  }, []);

  const listHeader = useMemo(
    () => (
      <>
        <Header screen="Home" />
        <Hero />
        <Searchbar
          placeholder="Search"
          placeholderTextColor={colors.muted}
          onChangeText={setSearchBarText}
          value={searchBarText}
          style={styles.searchBar}
          iconColor={colors.yellow}
          inputStyle={{ color: colors.white }}
          elevation={0}
        />
        <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={MENU_CATEGORIES}
        />
      </>
    ),
    [filterSelections, handleFiltersChange, searchBarText]
  );

  const emptyMessage = error
    ? 'The menu could not be loaded. Pull to refresh or try again later.'
    : loading
      ? 'Loading menu...'
      : 'No dishes match your search.';

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={data}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          {loading ? <ActivityIndicator color={colors.primary} /> : null}
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Item
          name={item.name}
          description={item.description}
          price={item.price}
          image={getMenuImageUrl(item.image)}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 24,
    flexGrow: 1,
  },
  searchBar: {
    marginTop: -24,
    marginBottom: 20,
    backgroundColor: colors.primary,
    shadowRadius: 0,
    shadowOpacity: 0,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    paddingLeft: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  itemCopy: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 8,
  },
  itemPrice: {
    fontWeight: '500',
  },
  itemImage: {
    height: 90,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 14,
  },
});
