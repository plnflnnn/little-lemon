import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../contexts/UserContext';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isSignedIn, isLoading } = useUser();

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
