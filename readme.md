## Game Catalog Angular UI

### This read me file applies to three projects, which all can be found in my github repo:
* GameCatalog.UI <-- this project
* GameCatalog.API
* GameCatalog.Test

## GameCatalog.UI
This is an Angular UI project designed to display and edit hypothetical catalog of games. There are two pages in the app: browsing the games and editing an item. The Angular framework was chosen since it is the framework I am most familiar with. While I primarily use Angular, I have some exposure to React. As a demonstration, a small section of the application integrates a React component into the existing Angular project (see the footer for details).

The environment file contains the address of the api to talk to. Modify this file if needed, as your API may run on a different port.

## GameCatalog.API
This is the API application designed to run on the dotnet core framework. I developed on Linux but it should be fine on Windows. The backend uses Sqlite database. I have included the migration script for your convinience if you want to create a brand-new db. However, if issues are encounted, you are welcome to use the included gamecatalog.db. Some sample images are also included in the 'Files' directory. Do not rename these, as they correspond to records in the database.

## GameCatalog.Test
Unit testing project for the API. I've only added tests for the controller as I am running out of time for this homework project. For the project to link properly, place it at the same level as the API project. Alternatively, you can modify the reference in the GameCatalog.Test.csproj file.

## Project requirements
For your convinience, I've attached the assignment.pdf outlining the requirements. They are minimal to say the least so I had quite a bit of creative freedom. The frontend showcases use of Angular framrwork features, routing, form validation, scss styling, subscription management, use of directives, and some minimal UI testing. Backend displays use of EF core code first for model management, dependency injection and work with static files (image retrieval/update).