import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
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

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key "${key}":`, e);
    throw e;
  }
};
