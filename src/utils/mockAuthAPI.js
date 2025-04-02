import { FAKE_JWT_TOKEN, MOCK_IDP_TOKEN } from '../constants/auth'

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
          token: FAKE_JWT_TOKEN,
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
          idpToken: MOCK_IDP_TOKEN,
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
      if (idpToken === MOCK_IDP_TOKEN) {
        resolve({
          token: FAKE_JWT_TOKEN,
          redirect: `http://localhost:3000/callback?token=${FAKE_JWT_TOKEN}`
        });
      } else {
        resolve({ error: 'Invalid IDP token' });
      }
    }, 1000);
  });
}

// Mock dashboard data
const mockDashboardData = [
  {
    id: 1,
    title: "Website Redesign Project",
    status: "active",
    priority: "high",
    dueDate: "2023-12-15",
    progress: 65,
    assignedTo: "Sarah Johnson",
    description: "Complete UI/UX redesign for main website",
    lastUpdated: "2023-11-28T09:45:00Z"
  },
  {
    id: 2,
    title: "API Integration",
    status: "pending",
    priority: "medium",
    dueDate: "2023-12-05",
    progress: 30,
    assignedTo: "Michael Chen",
    description: "Integrate with third-party payment API",
    lastUpdated: "2023-11-25T14:30:00Z"
  },
  {
    id: 3,
    title: "Database Migration",
    status: "completed",
    priority: "critical",
    dueDate: "2023-11-20",
    progress: 100,
    assignedTo: "David Wilson",
    description: "Migrate legacy database to new cluster",
    lastUpdated: "2023-11-20T16:15:00Z"
  },
  {
    id: 4,
    title: "Mobile App Testing",
    status: "active",
    priority: "medium",
    dueDate: "2023-12-10",
    progress: 45,
    assignedTo: "Emma Davis",
    description: "Conduct QA testing for iOS/Android apps",
    lastUpdated: "2023-11-29T11:20:00Z"
  },
  {
    id: 5,
    title: "Security Audit",
    status: "pending",
    priority: "high",
    dueDate: "2023-12-18",
    progress: 10,
    assignedTo: "James Rodriguez",
    description: "Perform comprehensive security assessment",
    lastUpdated: "2023-11-27T13:10:00Z"
  }
]

// Fetch dashboard data
export const mockFetchData = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === FAKE_JWT_TOKEN) {
        resolve({
          data: [...mockDashboardData],
          metadata: {
            totalItems: 5,
            page: 1,
            pageSize: 10,
            hasMore: false
          }
        });
      } else {
        reject(new Error("Unauthorized"));
      }
    }, 1000); // 1 second delay to simulate network request
  });
};