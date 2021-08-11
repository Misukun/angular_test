# AngularTest
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Start
First of all, install the dependencies by running `npm install`.
It is also very important to have the @angular/cli installed globally. if not installed, install it with command `npm install -g @angular/cli`.

**IMPORTANT... If you have any ad blocking extension like adBlock, please disable it before you start using the app as the `https: // ibillboard.com / api / positions` service doesn't work properly with this extension and the app it will not work properly.**

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build and production server
Run `npm run serve` to build the project. The build artifacts will be stored in the `dist/` directory. 
This script will also turn on a server that will read the distribution generated in `dist/angular-test` in `http://localhost:8080/`.

## Running unit tests
Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io) with coverage. 
A folder called coverage will be generated where a file called `index.html` will be found. When this file is executed, a window will open showing all the coverage of the unit tests.

## Use case
Simple employee management app. A CRUD with database in firebase.
