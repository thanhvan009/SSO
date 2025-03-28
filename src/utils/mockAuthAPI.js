export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        resolve({
          token: "fake-jwt-token",
          user: { id: 1, username: "admin" },
          redirect: 'http://localhost:3000/callback?token=fake-jwt-token'
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1500);
  });
};

export const mockBackend = {
  validateIdPToken: (idpToken) => {
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
};