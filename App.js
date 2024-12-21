import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import './gesture-handler.native'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider databaseName="little_lemon.db">
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SQLiteProvider>
  );
}

