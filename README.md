# Pact Angular Spring Boot Example [![Build Status](https://github.com/richardhendricksen/pact-example-angular8-spring-boot/workflows/CI/badge.svg)](https://github.com/richardhendricksen/pact-example-angular8-spring-boot/actions?query=workflow%3ACI)

This code provides examples how to setup contract testing using Angular as a Consumer and Spring Boot as a Provider.
Read more about it in my blog post [here](https://medium.com/@richard.hendricksen/consumer-driven-contract-testing-with-pact-for-angular-and-spring-boot-9c84caac4040).

## Consumers
This repository contains 2 Consumers, both are Angular front-ends. Contracts are written to `pacts` root folder.
The difference is the used framework to setup the Pact tests: Karma and Jest.

### Karma
Currently on Angular 8.
Run with `npm run test`/`yarn test`/`ng test`.

#### Key files
- `src/app/user.service.ts`: Angular service that calls REST backend to manage users
- `user.service.pact.spec.ts`: Karma/Jasmine consumer Pact test for user service
- `karma.conf.js`: Karma configuration for consumer Pact tests

### Jest
Updated to Angular 10.
Run with `npm run test`/`yarn test`/`ng test`.

#### Key files
- `src/app/user.service.ts`: Angular service that calls REST backend to manage users
- `user.service.pact.spec.ts`: Karma/Jasmine consumer Pact test for user service
- `jest.pact.config`: Jest configuration for consumer Pact tests
- `pact/jest/setupJest.ts`: Jest setup file to setup Pact

#### Important information
Don't forget `"emitDecoratorMetadata": true` in the `tsconfig.json` file to prevent `Can't resolve all parameters for Component`.  
See https://github.com/thymikee/jest-preset-angular/issues/288

## Provider
Provider is a Spring Boot backend server which provides the user endpoint.

### Spring boot
Run with `mvn clean verify`.

#### Key files
- `UserController.java`: Spring Boot user endpoint
- `User.java`: Model representing a user
- `UserServiceVerificationTest.java`: Pact Provider test, verifies contracts found in `pacts` root folder.
