import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './auth-type';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearCredentials(state) {
      state.user = null;
      state.accessToken = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading } = authSlice.actions;
export default authSlice.reducer;
