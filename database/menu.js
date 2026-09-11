const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const IMAGE_BASE_URL =
  'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images';

export const MENU_CATEGORIES = ['Starters', 'Mains', 'Desserts'];

export function getMenuImageUrl(filename) {
  return `${IMAGE_BASE_URL}/${filename}?raw=true`;
}

export async function initDatabase(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      category TEXT,
      description TEXT,
      image TEXT
    );
  `);
}

async function fetchMenuFromApi() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Menu request failed (${response.status})`);
  }
  const json = await response.json();
  return json.menu ?? [];
}

export async function seedMenuIfEmpty(db) {
  const row = await db.getFirstAsync('SELECT COUNT(*) as count FROM menuitems');
  if (row?.count) {
    return;
  }

  const menu = await fetchMenuFromApi();
  if (!menu.length) {
    return;
  }

  await db.withTransactionAsync(async () => {
    for (const item of menu) {
      await db.runAsync(
        'INSERT INTO menuitems (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)',
        [
          item.name,
          item.price,
          item.category,
          item.description,
          item.image,
        ]
      );
    }
  });
}

export async function filterMenuItems(db, query, activeCategories) {
  const clauses = [];
  const params = [];

  if (activeCategories.length) {
    const placeholders = activeCategories.map(() => '?').join(', ');
    clauses.push(`LOWER(category) IN (${placeholders})`);
    params.push(...activeCategories.map((category) => category.toLowerCase()));
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    clauses.push('name LIKE ?');
    params.push(`%${trimmedQuery}%`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return db.getAllAsync(`SELECT * FROM menuitems ${where}`, params);
}
