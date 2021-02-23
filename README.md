![header](https://github.com/Miboch/IGJ2021/blob/main/resources/igj2021.png?raw=true)

## Technology Used
* Golang Gin-gonic
* Angular
* TypeScript
* PostgreSQL
* NGINX

## Preparation
The site layout and scaffolding was prepared in advance to the game jam. This means code for layout responsiveness, notifications, and paging was prepared in advance.

No code was written on the actual game prior to the beginning of the game jam.

## CC0
All code developed in preparation, and during the Game Jam released in this repository is under the Creative Commons license. See [License](https://github.com/Miboch/IGJ2021/blob/main/LICENSE) for details.

## Where can I find the game
The most current version of the game can be found [Here](https://lemon.indiedev.io) or on ~~[ITCH.IO](https://itch-url-here.io)~~

## Feature Requests
If you're someone who is play testing the game during the Game Jam, you can submit feedback directly on the game's page, or by opening an issue in this repository, or by contacting a contributor directly on [Discord](https://discord.gg/Bv8vdChMsv)

## OSS Contributors
You can contribute to this project by forking it and submitting a pull-request to the develop branch. If you wish to become a direct contributor contact any of the main contributors directly.

## Project Setup
Complete the following steps to prepare development on your local machine.

### Prerequisites
- [Install Node](https://nodejs.org/en/) - The LTS version is fine 
- [Install Yarn](https://classic.yarnpkg.com/en/) 
- [Install the angular CLI](https://angular.io/) 

```
yarn global add @angular/cli
```

### Starting the Project
- (Non-Direct Contributors Only) Fork this repository.
- Clone the repository into a folder on your local machine 
- Navigate into the newly created folder
- Open your terminal of choice: CMD|Powershell|gnome|etcetera 
- Checkout develop
- run yarn install
- once the install is finished you can start serving the project by running `yarn run start`

### API
In order to have the full functionality of the site, you must also clone and run the api project which can be found [here](https://github.com/jeremy-sprinkle/lemon-api)

**To run the API you will need**
* Go
* A configured postgres database
* rename the `config-scrubbed.json` to `config.json` and update the relevant settings within the file.
* rename the `Makefile-Scrubbed` to `Makefile` and update the relevant settings within the file.
* build the api project use the following commands while your working directory is in the root of the api project  
  **Unix:** `make`  
  **Windows:** `go build .\cmd\main.go`
* Reconfigure the `src/proxy.conf.json` file in the angular application to point at `http://localhost:8080`
* Run the API and the angular application.

## Project Structure

The project is divided into parent directories under the `/app` folder based off their major "responsibility".

 - **game:** All code which is directly related to the game.
 - **ui:** the common reusable ui components. These are imported in the other modules
 - **host:** The components which relate to the "host application." Features such as login, resolvers and auth guards.
 - **debugger:** Debugging tools and components, separated into its own module to easily separate out when building with the `--prod` flag.

## Special Thanks
[Special thanks to Arkraga on twitch.tv for creating art assets for our team](https://twitch.tv/arkraga)
