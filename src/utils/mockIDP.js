export const mockIDP = {
    // Mock user database
    users: [
        { id: 'idp-101', username: 'admin', password: '123456' }
    ],

    // Simulate IDP verification
    verifyCredentials: (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockIDP.users.find(
                    u => u.username === username && u.password === password
                );

                if (user) {
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
};