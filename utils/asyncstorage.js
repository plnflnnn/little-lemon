
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key).catch((e) => console.log(e.message));
        return data;
      } catch(e) {
        console.log(e.message)
    }
}

export const multiGetData = async (...keys) => {
    try {
        const data = await AsyncStorage.multiGet(keysArray)
            .then(data => console.log(data))
            .catch((e) => console.log(e.message));
        return data;
      } catch(e) {
        console.log(e.message)
    }
}


export const setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
            .then(() => console.log(`${key} with ${value} value has been saved in AsyncStorage.`))
            .catch((e) => console.log(e.message));
      } catch(e) {
        console.log(e.message)
    }
}

export const multiSetData = async (...arrays) => {
    const arraysArray = [...arrays];
    try {
        const data = await AsyncStorage.multiSet(arraysArray)
            .then(data => console.log(data))
            .catch((e) => console.log(e.message));
        return data;
      } catch(e) {
        console.log(e.message)
    }
}

export const updateData = async (key, value) => {
    try {
        await AsyncStorage.mergeItem(key, value)
            .then(() => console.log(`${key} value has been changed to ${value}.`))
            .catch((e) => console.log(e.message));
      } catch(e) {
        console.log(e.message)
    }
}

export const deleteData = async () => {
    try {
        await AsyncStorage.clear()
            .then(() => console.log('AsyncStorage has been cleared.'))
            .catch((e) => console.log(e.message));
      } catch(e) {
        console.log(e.message)
    }
}