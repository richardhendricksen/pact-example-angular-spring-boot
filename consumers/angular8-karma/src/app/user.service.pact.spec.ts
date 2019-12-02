import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from './user';
import { Matchers, PactWeb } from '@pact-foundation/pact-web';

describe('UserServicePact', () => {

  let provider;

  // Setup Pact mock server for this service
  beforeAll(async () => {

    provider = await new PactWeb({
      consumer: 'ui-karma',
      provider: 'userservice',
      port: 1234
    });

    // required for slower CI environments
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Required if run with `singleRun: false`
    await provider.removeInteractions();
  });

  // Configure Angular Testbed for this service
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        state: `users 42 exists`,
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
