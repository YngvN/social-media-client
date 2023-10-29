import { login } from '../js/api/auth/login.js';

global.fetch = jest.fn();

const saveMock = jest.fn();
global.save = saveMock;

describe('login function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('stores a token when provided with valid credentials', async () => {
    const mockAccessToken = 'mockedAccessToken';
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        accessToken: mockAccessToken,
      }),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const email = 'test@example.com';
    const password = 'testpassword';

    await login(email, password);

    expect(saveMock).toHaveBeenCalledWith('token', mockAccessToken);
  });
});
