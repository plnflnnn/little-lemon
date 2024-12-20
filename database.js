import * as SQLite from 'expo-sqlite';

const openDatabase = async () =>{
  const db = await SQLite.openDatabaseSync('little_lemon', {
    useNewConnection: true
});
  return db;
}

export async function initializeDatabase() {

  const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
  console.log('response: ' + response)

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();

  const db = openDatabase();
  try{
    await db.execAsync(`
      create table if not exists menuitems (id integer primary key not null, name text, price decimal(10,2), category text, description text, image text);
      insert into menuitems ( name, price, category, description, image ) values ${json.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`);
  }catch(e){
    console.log(`createTable: An error occured ${e}`)
  }
}

export async function createTable() {  
  const db = openDatabase();
  try{
       const data = await db.execSync(
        "create table if not exists menuitems (id integer primary key not null, name text, price decimal(10,2), category text, description text, image text)"
      );
      return data;
  }catch(e){
      console.log(`createTable: An error occured ${e}`)
  }

  // return new Promise((resolve, reject) => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql(
  //         'create table if not exists menuitems (id integer primary key not null, name text, price integer, category text, description text, image text);'
  //       );
  //     },
  //     reject,
  //     resolve
  //   );
  // });

}

export async function getMenuItems() {
  const db = openDatabase();
  try{
    const menuItems = await db.getAllSync(
        'select * from menuitems'
    )
    return menuItems;
  }catch(e){
      console.log(`getMenuItems: An error occured ${e}`)
  }

  // return new Promise((resolve) => {
  //   db.transaction((tx) => {
  //     tx.executeSql('select * from menuitems', [], (_, { rows }) => {
  //       resolve(rows._array);
  //     });
  //   });
  // });
}

export async function saveMenuItems(menuItems) {
  const db = openDatabase();
  try{
    let data = await db.runAsync(`insert into menuitems ( name, price, category, description, image ) values ${menuItems.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`)
    return data;
  }catch(e){
      console.log(`saveMenuItems: An error occured ${e}`)
  }

  // db.transaction((tx) => {
  //   tx.executeSql(
  //     `insert into menuitems ( name, price, category, description, image ) values ${menuItems.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`
  //   );
  // });
}

export async function filterByQueryAndCategories(query, activeCategories) {

  //console.log(query)
  //console.log(activeCategories)

  const db = openDatabase();
  const categories = activeCategories.map(() => '?').join(', '); 
  const name = query ? `AND name LIKE '%${query}%'` : ''; 

  try{
    const data = await db.getAllSync(
      `SELECT * FROM menuitems WHERE category IN (${categories}) ${name}`, 
      [...activeCategories]
    )
    return data;

  }catch(e){
      console.log(`filter: An error occured ${e}`)
  }

  // return new Promise((resolve, reject) => {
  //   const categories = activeCategories.map(() => '?').join(', '); 
  //   const title = query ? `AND title LIKE '%${query}%'` : ''; 
    
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `SELECT * FROM menuitems WHERE category IN (${categories}) ${title}`,
  //       activeCategories,
  //       (_, { rows }) => {
  //         resolve(rows._array);
  //       }
  //     );
  //   });
  // });
}


export async function dropTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DROP DATABASE little_lemon;'
        );
      },
      reject,
      resolve
    );
  });
}