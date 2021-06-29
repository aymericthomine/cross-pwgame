![Title](https://i.ibb.co/KV7wH1K/logo.png)

GAMOON is a multiplayer game build with Typescript and React Native.

## GAMOON - CROSS-PWGAME

This repository contains the server and client part of the project.

### Prerequisites - Server

Install modules
  ```sh
  cd server && yarn
  ```
  
Run the server
```sh
yarn start
```

### Prerequisites - Client

Install modules
  ```sh
  cd client && yarn
  ```
  
Run the client
```sh
yarn start
```

### Commands

1. Reload the app
```sh
r
```
2. Launch on IOS
```sh
i
```
2. Launch on Android
```sh
a
```


## Routes utilisation

|Method	|Route	|Description|
|-------|------|-----------|
|GET	| /users | this should respond with a list of all cards.|
|GET	| /users/:id	| this route should display a single card's found on the database.|
|POST	| /user | this route should add a new card on the database.|
# cross-pwgame
