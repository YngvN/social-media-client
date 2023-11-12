import { login } from '../js/api/auth/login.js';

global.fetch = jest.fn();

const mockLocalStorage = () => {
  let storage = {};
  return {
    getItem: jest.fn(key => storage[key] || null),
    setItem: jest.fn((key, value) => {
      storage[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      storage = {};
    })
  };
};

global.localStorage = mockLocalStorage();

describe('login function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('stores a token in local storage when provided with valid credentials', async () => {
    const mockAccessToken = 'mockedAccessToken';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        accessToken: mockAccessToken,
      }),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const email = 'YngNyk98390@stud.noroff.no';
    const password = 'Yngve1992';

    await login(email, password);

    // Extract the calls made to localStorage.setItem
    const setItemCalls = localStorage.setItem.mock.calls;

    // Check if any call to localStorage.setItem had 'token' as the first argument
    const tokenSetCalls = setItemCalls.filter(call => call[0] === 'token');

    // Expect at least one call with 'token' as the first argument
    expect(tokenSetCalls.length).toBeGreaterThan(0);

    // Check if all 'token' calls had a non-empty string as the second argument
    tokenSetCalls.forEach(call => {
      expect(call[1]).toBeTruthy();
      expect(typeof call[1]).toBe('string');
    });
  });
});
