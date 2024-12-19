
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
    // const keysArray = ...keys;
    //console.log('keys: ' + keysArray);
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
    //console.log(arraysArray)

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

    // or 
    // const keys = await AsyncStorage.getAllKeys();
    // console.log('keys: ' + keys)
    // await AsyncStorage.multiRemove(keys);

    // AsyncStorage.getAllKeys((err, keys) => {
    //     AsyncStorage.multiGet(keys, (err, stores) => {
    //       stores.map((result, i, store) => {
    //         // get at each store's key/value so you can work with it
    //         let key = store[i][0];
    //         let value = store[i][1];
    //       });
    //     });
    //   });
}


// setFirstName(values[0][1]);
// setLastName(values[1][1]);
// setEmail(values[2][1]);
// setPhone(values[3][1]);
// setOrderStates(values[4][1]);
// setPasswordChanges(values[5][1]);
// setSpecialOrders(values[6][1]);
// setNewsletters(values[7][1]);
// setImage(values[8][1]);

// setState((state) => {
//   return {
//     ...state,
//     firstName: values[0][1],
//     lastName: values[1][1],
//     email: values[2][1],
//     phone: values[3][1],
//     orderStates: values[4][1],
//     passwordChanges: values[5][1],
//     specialOrders: values[6][1],
//     newsletters: values[7][1],
//     image: values[8][1],
//   }
// });