import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import './gesture-handler.native'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';


async function initializeDatabase(db) {

  const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
  console.log('response: ' + response)

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  const menu = json.menu;
  console.log(typeof(json))

  try{
    await db.execAsync(`
      create table if not exists menuitems (id integer primary key not null, name text, price decimal(10,2), category text, description text, image text);
      insert into menuitems ( name, price, category, description, image ) values ${menu.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`);
  }catch(e){
    console.log(`createTable: An error occured ${e}`)
  }
}

export default function App() {
  return (
    <SQLiteProvider databaseName="little_lemon.db" onInit={initializeDatabase}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SQLiteProvider>
  );
}

