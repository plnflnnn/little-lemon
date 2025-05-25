import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData, setData } from "../utils/asyncstorage";
import Onboarding from "../screens/Onboarding";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [state, setState] = useState({
    isSignedIn: false,
    isLoading: true,
  });

  async function checkUser() {
    try {
      const isLoggedIn = await getData('isSignedIn');
      setState({
        isLoading: false,
        isSignedIn: isLoggedIn === 'true',
      });
    } catch (e) {
      setState({
        isLoading: false,
        isSignedIn: false,
      });
      Alert.alert(`An error occurred: ${e.message}`);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setState(state => ({ ...state, isLoading: true }));
        await checkUser();  // await this here
      } catch (e) {
        setState(state => ({ ...state, isLoading: false, isSignedIn: false }));
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, []);
  
  function handleSignIn() {
    setData('isSignedIn', 'true');
    setState(state => ({ ...state, isSignedIn: true }));
  }

  function handleLogOut() {
    setData('isSignedIn', 'false');
    setState(state => ({ ...state, isSignedIn: false }));
  }

  if (state.isLoading) {
    return <Splash />;
  }

  function MyDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: '#495E57',
          drawerActiveBackgroundColor: '#ccc',
          drawerLabelStyle: { color: 'black' },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Profile" options={{ headerShown: false }}>
          {() => <Profile handleLogOut={handleLogOut} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isSignedIn ? (
        <Stack.Screen name="Profile">
          {() => <MyDrawer />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Onboarding">
          {props => <Onboarding {...props} handleSignIn={handleSignIn} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
