#Pact Angular 8 Spring Boot Example

This code provides examples how to setup contract testing using Angular 8 as a Consumer and Spring Boot as a Provider.

##Consumer
This repository contains 2 consumers, both are Angular 8 front-ends. Contracts are written to `pacts` root folder.
The difference is the used framework to setup the Pact tests: Karma and Jest.

### Karma
Run with `npm run test`/`yarn test`/`ng test`.

#### Key files
- `src/app/user.service.ts`: Angular service that calls REST backend to manage users
- `user.serivce.pact.spec.ts`: Karma/Jasmine consumer Pact test for user service
- `karma.conf.js`: Karma configuration for consumer Pact tests

### Jest
Run with `npm run test`/`yarn test`/`ng test`.

#### Key files
- `src/app/user.service.ts`: Angular service that calls REST backend to manage users
- `user.serivce.pact.spec.ts`: Karma/Jasmine consumer Pact test for user service
- `jest.pact.config`: Jest configuration for consumer Pact tests
- `pact/jest/setupJest.ts`: Jest setup file to setup Pact

#### Important information
Don't forget `"emitDecoratorMetadata": true` in the `tsconfig.json` file to prevent `Can't resolve all parameters for Component`.  
See https://github.com/thymikee/jest-preset-angular/issues/288

##Provider
Provider is a Spring Boot backend server which provides the user endpoint.

###Spring boot
Run with `mvn clean verify`.

#### Key files
- `UserController.java`: Spring Boot user endpoint
- `User.java`: Model representing a user
- `UserServiceVerificationTest.java`: Pact Provider test, verifies contracts found in `pacts` root folder.
