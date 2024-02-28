# HackerNewsUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Configuration

run node and npm install in terminal if not on the system

to access the api data below is the url of the api deployed on the azure.
apiUrl: 'https://rsystemshackernewsapi.azurewebsites.net/api'

To test on local we have to change the url when we run the .net core api project the url from the browser we need to change there for example :
apiUrl: 'https://localhost:7895/api'

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Almost 90% of the code coverage in the test cases.
Have to run the ng test --code-coverage command in the termial to see the test results.
If testing on local you have to change the url in the file story-service.service.spec.ts line 29
const expectedUrl = 'https://rsystemshackernewsapi.azurewebsites.net/api/Stories/NewStories?pageNumber=${pageNumber}&pageSize=${pageSize}&searchString=${searchText}'

Replace base url 'https://rsystemshackernewsapi.azurewebsites.net'
with 
your local url for ex: 'https://localhost:7895/api'

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
