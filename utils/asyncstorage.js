import AsyncStorage from '@react-native-async-storage/async-storage';

// Get a single item by key
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // If stored data is JSON string, parse it, otherwise return raw string
    try {
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch {
      return jsonValue;
    }
  } catch (e) {
    console.error(`Error reading key "${key}":`, e);
    throw e;
  }
};

// Set a single item by key
export const setData = async (key, value) => {
  try {
    // Store values as JSON string for consistency
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error saving key "${key}":`, e);
    throw e;
  }
};

// Remove a single item by key
export const deleteData = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.error('Error removing multiple keys:', e);
      throw e;
    }
  };

// Set multiple key-value pairs at once
// Accepts array of [key, value], values can be objects or primitives
export const multiSetData = async (keyValuePairs) => {
  try {
    // Convert all values to JSON strings
    const pairs = keyValuePairs.map(([key, value]) => [key, JSON.stringify(value)]);
    await AsyncStorage.multiSet(pairs);
  } catch (e) {
    console.error('Error saving multiple key-value pairs:', e);
    throw e;
  }
};

// Get multiple keys at once, returns object { key: value }
export const multiGetData = async (keys) => {
  try {
    const result = await AsyncStorage.multiGet(keys);
    const data = {};
    result.forEach(([key, value]) => {
      try {
        data[key] = value != null ? JSON.parse(value) : null;
      } catch {
        data[key] = value;
      }
    });
    return data;
  } catch (e) {
    console.error('Error reading multiple keys:', e);
    throw e;
  }
};
