import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Auth {
  logged: boolean;
  user: {};
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  walletAddress: string;
  role: string;
  geographicalAddress: string;
  isActive: boolean;
}
export const initialUser: User = {
  id: '1',
  firstName: '',
  lastName: '',
  username: 'Trung',
  email: '',
  phone: '',
  image: '',
  walletAddress: '',
  role: '',
  geographicalAddress: '',
  isActive: false,
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
      state.user = action.payload;
    },
    logOut: (state) => {
      state.logged = false;
      state.user = initialUser;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setLogin, logOut } = userSlice.actions;

export default userReducer;
