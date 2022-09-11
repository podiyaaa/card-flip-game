# card-flip-game

## Singtel Mobile App Assignment
### Requirements (A Mac is required to build projects with native code for iOS)

- react-native cli
- yarn
- node
- watchman
- openjdk
- Homebrew
- Xcode
- Cocoapods (for IOS)
- Android studio with emulator

### Installation - macOS

- initially run through following codes
  `brew install node`  
  `brew install yarn`  
  `brew install watchman`  
  `brew tap AdoptOpenJDK/openjdk`  
  `brew cask install adoptopenjdk8`
- next install react-native-cli
  `npm install -g react-native-cli`

### Installation - Windows

- install java JDK - SET environment variables to PATH ( JAVA_HOME & ANDROID_HOME)
- install node [Node Download](https://nodejs.org/en/download/ "Node Download")
- install yarn [Yarn Download](https://yarnpkg.com/lang/en/docs/install/#windows-stable "Yarn Download")
- next install react-native-cli
  `npm install -g react-native-cli`

### Install Cocoapods

- open terminal and run `brew install cocoapods`. (Only macOS)

### Run application

- open terminal and got to **card-flip-game/** project directory.
- open **android/local.properties** and set Android Sdk path to **sdk.dir** (if needed)
- run followings
  `yarn` - this will install all node frameworks to your project node modules.  
  `cd ios/` -> `pod install` - installing pods related to project. one its done, go back with `cd ..`  
  `yarn start -- --reset-cache` - this will start the react packager/server.  
  `npx react-native run-ios` - this will build application and run on ios simulator.  
  `npx react-native run-android` - this will build application and run on android emulator.

### Example video

![](./example/example.mp4)

