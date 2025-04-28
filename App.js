import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import './gesture-handler.native'
import { SQLiteProvider } from 'expo-sqlite';
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <SQLiteProvider databaseName="little_lemon.db">
        <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </SQLiteProvider>
  );
}

