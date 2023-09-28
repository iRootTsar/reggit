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

Ngrok:
ngrok.yml in project root:

"version: 2
region: eu
authtoken: AUTH_TOKEN
tunnels:
api:
addr: 5101
proto: http
subdomain: DOMAIN_NAME"

Add a .env file in mobile `NGROK_DOMAIN = "NGROK_DOMAIN_ADRESS"`

## Run

All commands to run can be run from project root folder, check package.json in project root folder.
For running individually you can check the commands or do as following:

Postgresql & Docker for local db: `docker-compose -f docker-compose.yml up` and to remove `docker-compose -f docker-compose.yml down`

.net api: `cd api` -> `dotnet watch` for hot reload.

If Metro bundler server doesn't automatically start you can run;
Metro bundler server: `cd mobile` -> `yarn start`.
This is mostly used for android app when run with the command below.

Android: `yarn android`

iOS: `yarn ios` or `yarn ios-pro` for 14 pro (dont forget to downlaod Android studio and XCode and set them up appropriately)

Web: `yarn start`

To run whole project seperate terminals run `yarn run ngrok` then `yarn run-all` 

In case you have an ANdroid tablet connect it with usb to the computer and run `npx react-native run-android --deviceId=#########` replace ##### wit hdevice ID

For IOS you can run build on XCode and choose device after settign it up first time if device is on network you can run it remotely
by typing i and a in terimanl after `yarn run-all` command this should start building and bundling application on devices.


## Contribution

Tor-Inge Jenssen og Caroline Gannefors som prosjektledere.
Øystein Vikene og Vladimirs Civilgins som utviklere

## Testing



## License
