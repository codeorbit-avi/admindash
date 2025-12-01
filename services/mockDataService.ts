import { User, UserStatus, AnalyticsData, UserStatusStats } from '../types';

const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Luna', 'Mike', 'Nora', 'Oscar'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const roles = ['Admin', 'Editor', 'Viewer', 'Contributor'];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const id = `usr_${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate a random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    users.push({
      id,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: Math.random() > 0.3 ? UserStatus.Active : UserStatus.Inactive,
      avatar: `https://picsum.photos/seed/${id}/200/200`,
      createdAt: date.toISOString(),
      lastActive: new Date().toISOString(),
    });
  }
  return users;
};

const generateAnalytics = (): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      signups: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
};

// Initial Mock Data
export const MOCK_USERS = generateUsers(50);
export const MOCK_ANALYTICS = generateAnalytics();

export const getStatusStats = (users: User[]): UserStatusStats[] => {
  const activeCount = users.filter(u => u.status === UserStatus.Active).length;
  const inactiveCount = users.filter(u => u.status === UserStatus.Inactive).length;
  
  return [
    { name: 'Active', value: activeCount, color: '#10b981' }, // emerald-500
    { name: 'Inactive', value: inactiveCount, color: '#ef4444' }, // red-500
  ];
};
