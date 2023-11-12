import { login } from '../js/api/auth/login.js';
import { logout } from '../js/api/auth/logout.js';

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

describe('Login and Logout Functions', () => { 
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

    const setItemCalls = localStorage.setItem.mock.calls;

    const tokenSetCalls = setItemCalls.filter(call => call[0] === 'token');

    expect(tokenSetCalls.length).toBeGreaterThan(0);

    tokenSetCalls.forEach(call => {
      expect(call[1]).toBeTruthy();
      expect(typeof call[1]).toBe('string');
    });
  });

  it('removes "token" and "profile" from storage when logging out', () => {
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('profile');
  });
});
