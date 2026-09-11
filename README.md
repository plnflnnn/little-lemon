# Little Lemon

React Native / Expo app for a Chicago Mediterranean restaurant. Users onboard with a name and email, browse a locally cached menu, filter by category, and manage a profile.

This is the capstone project for the Meta React Native specialization, cleaned up for a portfolio.

## Screens

- **Onboarding** — first name and email, with validation
- **Home** — hero, search, category filters, and menu from SQLite
- **Profile** — personal details, avatar, notification preferences, log out

Design references are in `wireframes/`.

## Stack

- Expo SDK 54 / React Native
- React Navigation (native stack)
- Expo SQLite for the offline menu
- AsyncStorage for the user profile
- React Native Paper for search and checkboxes

## Run locally

```bash
npm install
npx expo start
```

Then open the project in iOS Simulator, Android emulator, or Expo Go.

## Data

The menu is fetched once from the [Meta Working-With-Data API](https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API) and stored in SQLite. Later launches read from the local database.
