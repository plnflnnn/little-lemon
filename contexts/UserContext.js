import { createContext, useState, useEffect } from "react";
import { getData, multiSetData, deleteData } from "../utils/asyncstorage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderStates: 'true',
    passwordChanges: 'true',
    specialOrders: 'true',
    newsletters: 'true',
    image: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const keys = ['firstName', 'lastName', 'email', 'phone', 'orderStates', 'passwordChanges', 'specialOrders', 'newsletters', 'image'];
    const data = await Promise.all(keys.map(k => getData(k)));

    setUser({
      firstName: data[0] || '',
      lastName: data[1] || '',
      email: data[2] || '',
      phone: data[3] || '',
      orderStates: data[4] || 'true',
      passwordChanges: data[5] || 'true',
      specialOrders: data[6] || 'true',
      newsletters: data[7] || 'true',
      image: data[8] || '',
    });
  };

  // const saveUser = async (newUserData) => {
  //   setUser(newUserData);
  //   await multiSetData(
  //     ['firstName', newUserData.firstName],
  //     ['lastName', newUserData.lastName],
  //     ['email', newUserData.email],
  //     ['phone', newUserData.phone],
  //     ['orderStates', newUserData.orderStates],
  //     ['passwordChanges', newUserData.passwordChanges],
  //     ['specialOrders', newUserData.specialOrders],
  //     ['newsletters', newUserData.newsletters],
  //     ['image', newUserData.image]
  //   );
  // };


  const saveUser = async (newUserData) => {
    setUser(newUserData);
    await multiSetData([
      ['firstName', newUserData.firstName],
      ['lastName', newUserData.lastName],
      ['email', newUserData.email],
      ['phone', newUserData.phone],
      ['orderStates', newUserData.orderStates],
      ['passwordChanges', newUserData.passwordChanges],
      ['specialOrders', newUserData.specialOrders],
      ['newsletters', newUserData.newsletters],
      ['image', newUserData.image]
    ]);
  };

  
  const logout = async () => {
    const keysToRemove = [
      'isSignedIn',
      'firstName',
      'lastName',
      'email',
      'phone',
      'orderStates',
      'passwordChanges',
      'specialOrders',
      'newsletters',
      'image'
    ];
    await deleteData(keysToRemove);
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      orderStates: 'false',
      passwordChanges: 'false',
      specialOrders: 'false',
      newsletters: 'false',
      image: '',
    });
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, saveUser,loadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
