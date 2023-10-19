import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Auth {
  logged: boolean;
  user: User;
}
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  full_name: string;
  birthday: string;
  phone: string;
  address_wallet: string;
  address_real: string;
  is_active: boolean;
  system_role: string;
}
export const initialUser: User = {
  id: 'string',
  username: 'string',
  email: 'string',
  avatar: 'string',
  full_name: 'string',
  birthday: 'string',
  phone: 'string',
  address_wallet: 'string',
  address_real: 'string',
  is_active: false,
  system_role: 'string',
};
const initialAuth: Auth = {
  logged: false,
  user: initialUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialAuth,
  reducers: {
    setLogin: (state, action: PayloadAction<Auth>) => {
      state.logged = true;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.logged = false;
      state.user = initialUser;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setLogin, logOut, setUser } = userSlice.actions;

export default userReducer;
