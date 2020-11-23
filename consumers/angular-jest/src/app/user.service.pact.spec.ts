import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from './user';
import * as path from 'path';
import { Matchers, Pact } from '@pact-foundation/pact';

describe('UserServicePact', () => {

  const provider: Pact = new Pact({
    port: 1234,
    log: path.resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), '..', '..', 'pacts'),
    spec: 3,
    logLevel: 'info',
    consumer: 'ui-jest',
    provider: 'userservice'
  });

  // Setup Pact mock server for this service
  beforeAll(async () => {
    await provider.setup();
  });

  // Configure Angular Testbed for this service
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        UserService
      ]
    });
  });

  // Verify mock service
  afterEach(async () => {
    await provider.verify();
  });

  // Create contract
  afterAll(async () => {
    await provider.finalize();
  });

  describe('get()', () => {

    const userId = 1;

    const expectedUser: User = {
      firstName: 'Zaphod',
      lastName: 'Beeblebrox'
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `user 1 exists`,
        uponReceiving: 'a request to GET a user',
        withRequest: {
          method: 'GET',
          path: `/api/users/${userId}`
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike(expectedUser)
        }
      });
    });

    it('should get a user', async () => {
      const userService: UserService = TestBed.get(UserService);

      await userService.get(userId).toPromise().then(response => {
        expect(response).toEqual(expectedUser);
      });
    });
  });

  describe('create()', () => {

    const expectedUser: User = {
      firstName: 'Arthur',
      lastName: 'Dent'
    };

    const createdUserId = 42;

    beforeAll(async () => {
      await provider.addInteraction({
        state: `provider accepts a new user`,
        uponReceiving: 'a request to POST a user',
        withRequest: {
          method: 'POST',
          path: '/api/users',
          body: expectedUser,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 201,
          body: Matchers.somethingLike({
            id: createdUserId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      });
    });

    it('should create a user', async () => {
      const userService: UserService = TestBed.get(UserService);
      await userService.create(expectedUser).toPromise().then(response => {
        expect(response).toEqual(createdUserId);
      });
    });

  });

  describe('update()', () => {

    const expectedUser: User = {
      firstName: 'Zaphod',
      lastName: 'Beeblebrox'
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `user 42 exists`,
        uponReceiving: 'a request to PUT a user',
        withRequest: {
          method: 'PUT',
          path: '/api/users/42',
          headers: {'Content-Type': 'application/json'},
          body: Matchers.somethingLike(expectedUser)
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike(expectedUser)
        }
      });
    });

    it('should update a user', async () => {
      const userService: UserService = TestBed.get(UserService);

      await userService.update(expectedUser, 42).toPromise().then(response => {
        expect(response).toEqual(expectedUser);
      });
    });
  });
});
