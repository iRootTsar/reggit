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

Add a ngrok.yml in root directory

``` version: 2
region: eu
authtoken: "your token"
tunnels:
  api:
    addr: 5101
    proto: http
    subdomain: "subdomain name 1"
  web:
    addr: 3000
    proto: http
    subdomain: "subdomain name 2"
  printer:
    addr: 3030
    proto: http
    subdomain: "subdomain name 3" 
```

4. Ensure your Brother Printer (QL-810W/810Wc) is properly set up and connected to the same network. Prepare your template and transfer it to your printer using Transfer Express. The template file should be in .lbx format.

You can transfer the template by downloading the P-touch Editor 5.x from Brother's official website.

Note: Template transfer to the printer is currently supported only on Windows. MacOS is yet to offer this capability.

Project Directories:
- P-Touch contains the objects to be created.
- Server establishes the TCP socket connection to the printer. You can set the printer IP address and specify the number of print copies per request here.
- .NET within VisitController handles the API call to print.

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

For iOS, after the initial setup in XCode, if the device is on the same network as your PC, remotely run the app by pressing i (iOS) or a (Android) in 
the terminal after the `yarn run-all` command.


In case of any issues, refer to the troubleshooting steps below to clean various parts of your project and rebuild:

1. Cleaning Node Modules from root directory
``` rm -rf node_modules/
yarn install
```
2. Cleaning metro bundler cache
``` yarn start --reset-cache
```
3. Cleaning .NET projects 
``` cd api
dotnet clean
```
4. Cleaning CocoaPods for IOS
``` cd mobile/ios
pod deintegrate
pod cache clean --all
pod install
```
5. Cleaning Gradle for Android
``` cd mobile/android
./gradlew clean
```
Then you can try rebuilding project by running `yarn run ngrok`and `yarn run-all` in separate terminals

## Contribution

Tor-Inge Jenssen and Caroline Gannefors as Project leaders.
Øystein Vikene and Vladimirs Civilgins as developers.

## Testing



## License
