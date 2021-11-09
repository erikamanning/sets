# Sets - Puzzle Game Application

## Table of Contents

* [About](https://github.com/erikamanning/sets#about)
* [Installation](https://github.com/erikamanning/sets#installation)
* [User Flows](https://github.com/erikamanning/sets#user-flows)
* [Multiplayer Server](https://github.com/erikamanning/sets#api)
* [Roadmap](https://github.com/erikamanning/sets#roadmap)


## About

Sets is an application that allows you to play the classic puzzle game Set! You can play singleplayer or multiplayer. You can join a game with a link shared by a friend or you can enter the room code into the join form. If you register you can be part of the site ranking and compare your scores to other users. You will also have access to a dashboard which will contain your match history so you can track your progress.


## Installation
1. Clone Repo.
    ```sh
    https://github.com/erikamanning/sets.git
    ```
2. Install back end packages    
   ```sh
    cd sets-backend
    npm install
    ```
3. Create postgres database. Must have postgres installed.
    ```sh
    psql < sets.sql
    ```

4. Install front end packages.
    ```sh
    cd sets-frontend
    npm install
    ```

5. Run application from `sets-frontend` directory.
    ```sh
    npm start
    ```


## User Flows

### Landing Page
![Landing Page](/readme_images/landing_page.png)

---

### User Flow: Single Player
![Singleplayer Lobby](/readme_images/singleplayer_lobby.png)
![Singleplayer Gameplay](/readme_images/singleplayer_game.png)

---

### User Flow: Multiplayer 
![Multiplayer Lobby](/readme_images/multiplayer_lobby.png)
![Multiplayer Lobby](/readme_images/multiplayer_game.png)
![Multiplayer Result](/readme_images/multiplayer_result.png)

---

### User Flow: Leaderboard
<!-- ![Leaderboard](/readme_images/leaderboard.png) -->


## Multiplayer Server
This project owes much to the [Colyseus Framework](https://colyseus.io). The management of the game state, and player timing was handled using this library.

![Colyseus Logo](readme_images/colyseus_logo.webp)


## Roadmap
* In Development: A feature to make a charitable donation via a payment portal, using the Stripe API. 
* In Development: Registered users will soon be able to see their game history.
* Future: Want to add varying levels of difficulty when playing the computer.
* Future: Add more card skins to the game. If you would like to make skins and submit them then credit will be given to you for the skins and if possible down the road we will set up a portal for users to pay for the skins.