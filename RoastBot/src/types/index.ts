export interface Roast {
  id: string;
  roastee: {
    name: string;
    avatar: string;
  };
  roaster: {
    name: string;
    avatar: string;
  };
  amount: number;
  message: string;
  timestamp: string;
}