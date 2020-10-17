import { createSlice } from '@reduxjs/toolkit';
import { API_HOST } from '../../consts';
import { loadState, removeState, saveState } from '../localStorage';

const USER_STATE_KEY = 'user';
const persistedUser = loadState(USER_STATE_KEY);

export const userSlice = createSlice({
  name: 'user',
  initialState: persistedUser,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (email, password) => (dispatch) => {
  fetch(`${API_HOST}/user/login/${email}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ password }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'success') {
        saveState(USER_STATE_KEY, result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signoutUser = () => (dispatch) => {
  removeState(USER_STATE_KEY);
  dispatch(setUser(null));
};

export const signupUser = (email, password, nickname) => (dispatch) => {
  fetch(`${API_HOST}/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email, password, nickname }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 'success') {
        saveState(USER_STATE_KEY, result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const selectUser = (state) => state.user;

export default userSlice.reducer;
