# Reggit

Reggit, the registration app for events @Komponent

Mobile: React-native with TS and Nativewind (Tailwindcss)
Web: React with TS and TailwindCSS

## Table of Contents

1. [Installation](#installation)
2. [Run](#Run)
3. [Contribution](#contribution)
4. [Testing](#testing)
5. [License](#license)

## Installation

1. Clone the repository: `git clone https://gitlab.com/oeysteinvikane/reggit.git`
2. Navigate into the directory: `cd reggit`
3. Install dependencies:
   - For the mobile app, navigate into the `mobile` directory and run `yarn install`
   - For the web admin panel, navigate into the `web` directory and run `yarn install`

## Run

Postgresql & Docker for local db: "docker-compose -f docker-compose.yml up" and to remove "docker-compose -f docker-compose.yml down"

.net api: "cd api" -> "dotnet watch" for hot reload.

If Metro bundler server doesn't automatically start you can run;
Metro bundler server: "cd mobile" -> "npx react-native start" or "npx react-native start --reset-cache" to start Metro bundler server.
This is mostly used for android app when run with the command below.

Android: npx react-native run-android

iOS: npx react-native run-ios

- iOS runs best when ran from Xcode.

Web: yarn start

## Contribution

## Testing

## License
