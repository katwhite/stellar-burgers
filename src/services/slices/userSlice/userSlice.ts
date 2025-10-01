import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { AppDispatch, RootState } from '../../store';
import { setCookie } from '../../../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const login = createAsyncThunk<
  { refreshToken: string; accessToken: string; user: TUser },
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logout = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>('user/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const getUser = createAsyncThunk<
  { success: boolean; user: TUser },
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await getUserApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const checkUserAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('user/checkUserAuth', async (_, { dispatch }) => {
  if (localStorage.getItem('refreshToken')) {
    try {
      const res = await getUserApi();
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        dispatch(setUser(null));
      }
    } catch {
      dispatch(setUser(null));
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1 });
    }
  } else {
    dispatch(setUser(null));
  }
  dispatch(setIsAuthChecked(true));
});

export const registerUser = createAsyncThunk<
  { refreshToken: string; accessToken: string; user: TUser },
  { email: string; name: string; password: string },
  { rejectValue: string }
>('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const updateUser = createAsyncThunk<
  { success: boolean; user: TUser },
  { email?: string; name?: string; password?: string },
  { rejectValue: string }
>('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    return await updateUserApi(data);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '', { expires: -1 });
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      });
  }
});

export const selectUser = (state: RootState) => state.user.user;
export const selectAuth = (state: RootState) => state.user.isAuthChecked;
export const selectError = (state: RootState) => state.user.error;

export const { setIsAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
