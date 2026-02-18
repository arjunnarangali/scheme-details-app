# Scheme Details App

React Native (Expo) app that renders a mutual fund scheme details experience with analytics, allocation, holdings, riskometer, and return calculator sections.

## Features
- Scheme header with key fund metrics
- NAV performance graph and return analysis
- Analytics, allocation, holdings, and fund manager sections
- Return calculator with custom slider
- Riskometer visualization
- i18n-ready copy (English currently)

## Tech Stack
- Expo + React Native
- TypeScript
- React Navigation
- react-native-reanimated + gesture handler
- @shopify/react-native-skia for charts
- i18next for localization

## Requirements
- Node.js (LTS recommended)
- npm
- Expo CLI (`npm i -g expo-cli`) or `npx expo`

## Getting Started

```bash
cd scheme-details-app
npm install
```

## Run the App

```bash
npm run start
```

Then choose a platform:
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## Typecheck

```bash
npx tsc -p tsconfig.json --noEmit
```

## Project Structure
- `App.tsx`: entry point
- `src/screens`: screen containers
- `src/components`: UI components
- `src/constants`: colors, spacing, typography, config
- `src/data`: mock JSON data
- `src/utils`: calculations and formatting
- `src/locales`: i18n strings

## Configuration Notes
- Expo config: `app.json`
- Navigation: `src/app/navigation`
- Risk levels: `src/utils/calculations.ts`

## Data
Mock data is stored in `src/data/*.json`. Update these files to change the UI content.

