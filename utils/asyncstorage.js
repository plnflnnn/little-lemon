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
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error saving key "${key}":`, e);
    throw e;
  }
};

export const deleteData = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.error('Error removing multiple keys:', e);
      throw e;
    }
  };


export const multiSetData = async (keyValuePairs) => {
  try {
    const pairs = keyValuePairs.map(([key, value]) => [key, JSON.stringify(value)]);
    await AsyncStorage.multiSet(pairs);
  } catch (e) {
    console.error('Error saving multiple key-value pairs:', e);
    throw e;
  }
};


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
