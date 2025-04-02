// Mock user database
export const MOCK_USERS = {
  "user1": { id: 1, password: "123456", email: "user1@example.com", name: "Test User 1", roles: ["employee"] },
  "user2": { id: 2, password: "123456", email: "user2@example.com", name: "Test User 2", roles: ["employee"] },
  "tai123@gmail.com": { id: 3, password: "123456", email: "tai123@gmail.com", name: "Tai 123", roles: ["employee"] },
  "admin": {
    id: 4,
    password: "123456",
    email: "admin@example.com",
    name: "Admin User",
    roles: ["admin"]
  }
};

// Login Normal
export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS[username];
      if (user && user.password === password) {
        resolve({
          token: "fake-jwt-token",
          user: {
            ...user,
          },
          redirect: 'http://localhost:3000/callback?token=fake-jwt-token'
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1500);
  });
};

// IdP Credentials
export const verifyCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS[username];
      if (user && user.password === password) {
        resolve({
          verified: true,
          idpToken: 'mock-idp-token',
          user: { id: user.id, username: user.username }
        });
      } else {
        reject(new Error('IDP: Invalid credentials'));
      }
    }, 1500);
  });
}

// Validate IdP Token
export const validateIdPToken = (idpToken) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (idpToken === 'mock-idp-token') {
        resolve({ token: 'fake-jwt-token' });
      } else {
        resolve({ error: 'Invalid IDP token' });
      }
    }, 1000);
  });
}

// Fetch dashboard data
export const mockFetchData = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake-jwt-token") {
        resolve({
          data: [
            { id: 1, title: "Fake Task 1" },
            { id: 2, title: "Fake Task 2" },
            { id: 3, title: "Fake Task 3" },
          ],
        });
      } else {
        reject(new Error("Unauthorized"));
      }
    }, 1000);
  });
};