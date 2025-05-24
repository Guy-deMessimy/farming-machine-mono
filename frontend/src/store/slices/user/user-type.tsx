export interface User {
  id: string;
  email: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}
