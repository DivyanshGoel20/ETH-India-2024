import type { Roast } from '../types';

export const MOCK_ROASTS: Roast[] = [
  {
    id: '1',
    roastee: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    roaster: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    amount: 50,
    message: "Your code is so bad, even Internet Explorer wouldn't run it!",
    timestamp: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    roastee: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    roaster: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    amount: 75,
    message: "You're so slow, a loading spinner takes a coffee break waiting for you!",
    timestamp: '2024-03-15T09:15:00Z',
  },
];