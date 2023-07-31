# Reggit

Reggit, the registration app for events @Miles

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

Migration DB: `cd api` -> `dotnet ef migrations add "Name" --project ../dal`

## Run

All commands to run can be run from project root folder, check package.json in project root folder.
For running individually you can check the commands or do as following:

Postgresql & Docker for local db: `docker-compose -f docker-compose.yml up` and to remove `docker-compose -f docker-compose.yml down`

.net api: `cd api` -> `dotnet watch` for hot reload.

If Metro bundler server doesn't automatically start you can run;
Metro bundler server: `cd mobile` -> `yarn start`.
This is mostly used for android app when run with the command below.

Android: `yarn android`

iOS: `yarn ios` or `yarn ios-pro` for 14 pro

Web: `yarn start`

## Contribution

## Testing

## License
