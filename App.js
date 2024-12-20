import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import './gesture-handler.native'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { initializeDatabase } from "./database";

export default function App() {
  return (
    // <SQLiteProvider databaseName="ittle_lemon.db" onInit={initializeDatabase}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    // </SQLiteProvider>
  );
}
