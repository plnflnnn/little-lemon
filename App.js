import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import './gesture-handler.native';
import RootNavigator from './navigators/RootNavigator';
import { UserProvider } from './contexts/UserContext';
import { initDatabase } from './database/menu';
import Splash from './screens/Splash';
import { colors } from './theme/colors';

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Splash />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={paperTheme}
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <SQLiteProvider databaseName="little_lemon.db" onInit={initDatabase}>
          <UserProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </UserProvider>
        </SQLiteProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
