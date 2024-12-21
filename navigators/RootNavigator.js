import * as React from "react";
import {useState, useEffect} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData, setData } from "../utils/asyncstorage";
import Onboarding from "../screens/Onboarding";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    isSignedIn: false,
    isLoading: false,
    isError: false,
  });

  async function checkUser() {
    const isLoggedIn = await getData('isSignedIn');
    if(isLoggedIn == 'true') {
      if(state.isLoggedIn == 'true' ) {
        return 
      } else {
        setState(state => {
          return {...state,isLoading: false, isSignedIn: true}
        });
      }
    } else {
      if(state.isLoggedIn == 'false' ) {
        return 
      } else {
        setState(state => {
          return {...state,isLoading: false, isSignedIn: false}
        });
      }
    }
  }

  function handleSignIn() {
    setData('isSignedIn', 'true');
    setState(state => {
      return {...state,isLoading: false, isSignedIn: true}
    });
  }

  function handleLogOut() {
    setData('isSignedIn', 'false');
    setState(state => {
      return {...state,isLoading: false, isSignedIn: false}
    });
  }

  useEffect(() => {
    (async () => {
      // await AsyncStorage.clear();
      try {
        setState(state => {
          return {...state,isLoading: true}
        });
        checkUser();
      } catch (e) {
        setState(state => {
          return {...state,isLoading: false, isSignedIn: false,}
        });
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, []);

  if (state.isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <Splash />;
  }

  function MyDrawer() {

    const styles = {
      drawerActiveTintColor: '#495E57',
      drawerActiveBackgroundColor: '#ccc',
      drawerLabelStyle: {
        color: 'black',
      },
    }

    return (
      <Drawer.Navigator screenOptions={styles}>
        <Drawer.Screen name="Home" options={{navigation}} component={Home} />
        {/* <Drawer.Screen name="Profile" options={{navigation }} component={Profile} /> */}

        {/* <Drawer.Screen name="Profile" options={{navigation }}>
          {(props) => <Profile {...props} extraData={handleLogOut} />}
        </Drawer.Screen> */}

        <Stack.Screen
          name="Profile"
          component={() => {
            return <Profile handleLogOut={handleLogOut} />;
          }}
        />

      </Drawer.Navigator>
    );
  }


  return (
    <Stack.Navigator >
      {state.isSignedIn ? (
      // Onboarding completed, user is signed in

      // <Stack.Screen options={{ headerShown: false }} name="Profile">
      //   {(props) => <MyDrawer {...props} extraData={handleLogOut} />}
      // </Stack.Screen>
      

      // <Stack.Screen
      // name="Profile"
      // options={{ headerShown: false }} 
      // component={() => {
      //   return <MyDrawer extraData={handleLogOut} />;
      // }}
      // />

      <Stack.Screen
      name="Profile"
      component={() => {
        return <MyDrawer options={{ headerShown: false }} handleLogOut={handleLogOut} />;
      }}
      />

      ) : (

      // User is NOT signed in
      // <Stack.Screen  name="Onboarding">
      //   {(props) => <Onboarding {...props} extraData={handleSignIn} />
      // }</Stack.Screen>

      <Stack.Screen
      name="Onboarding"
      component={() => {
        return <Onboarding handleSignIn={handleSignIn} />;
      }}
      />

      // <Stack.Screen name="Profile" component={MyDrawer} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

