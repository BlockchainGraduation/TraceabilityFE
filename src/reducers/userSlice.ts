import staticVariables from '@/static';
import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Auth {
  logged: boolean;
  user: UserType;
}

export const initialUser: UserType = { avatar: staticVariables.noImage.src };
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
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload ;
    // },
    setUser: (state, action: PayloadAction<Object>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

const userReducer = userSlice.reducer;
export const { setLogin, logOut, setUser } = userSlice.actions;

export default userReducer;
