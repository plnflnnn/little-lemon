import * as SQLite from 'expo-sqlite';
//import * as SQLite from 'expo-sqlite/legacy';

// import { Alert } from 'react-native';
// import { SECTION_LIST_MOCK_DATA } from './utils/index';



export async function createTable() {  

  let db = new SQLite();
  db.openDatabase('little_lemon')
  .then(() => {
    return db.executeSql("create table if not exists menuitems (id integer primary key not null, name text, price integer, category text, description text, image text)", null);
  }).then(() => console.log('db created'))

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

//   let db = new SQLite();
// db.openDatabase({
//     name: "data.db",
//     location: "default"
// })
// .then(() => {
//     return db.executeSql("CREATE TABLE QUERY", null);
// })
// .then(() => {
//     console.log('table created');
//     return db.executeSql("INSERT DATA QUERY", DATA)
// })
// .then(() => console.log("inserted or ignored"))
// .catch(e => console.log("ERROR " + e));

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

  let db = new SQLite();
  db.openDatabase('little_lemon')
  .then(() => {
    return db.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
  }).then(() => console.log('data added'))


  // return new Promise((resolve) => {
  //   db.transaction((tx) => {
  //     tx.executeSql('select * from menuitems', [], (_, { rows }) => {
  //       resolve(rows._array);
  //     });
  //   });
  // });
}

export function saveMenuItems(menuItems) {

  let db = new SQLite();
  db.openDatabase('little_lemon')
  .then(() => {
    return db.executeSql( `insert into menuitems ( name, price, category, description, image ) values ${menuItems.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`);
  }).then(() => console.log('data saved'))


  // db.transaction((tx) => {
  //   tx.executeSql(
  //     `insert into menuitems ( name, price, category, description, image ) values ${menuItems.map((item) => `('${item.name}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`
  //   );
  // });
}

export async function filterByQueryAndCategories(query, activeCategories) {

  //console.log(query)
  //console.log(activeCategories)

  const categories = activeCategories.map(() => '?').join(', '); 
  const title = query ? `AND title LIKE '%${query}%'` : ''; 

  let db = new SQLite();
  db.openDatabase('little_lemon')
  .then(() => {
    return db.executeSql(`SELECT * FROM menuitems WHERE category IN (${categories}) ${title}`,
        activeCategories,
        (_, { rows }) => {
          resolve(rows._array);
        });
  }).then(() => console.log('data filtered'))


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