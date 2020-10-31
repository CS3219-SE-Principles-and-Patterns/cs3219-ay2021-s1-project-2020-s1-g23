import { createSlice } from '@reduxjs/toolkit';
import { API_HOST } from '../../consts';
import { loadState, removeState, saveState } from '../localStorage';

const MATCH_STATE_KEY = 'match';
const persistedMatch = loadState(MATCH_STATE_KEY);

export const matchSlice = createSlice({
  name: 'match',
  initialState: persistedMatch,
  reducers: {
    setMatch: (state, action) => action.payload,
  },
});

export const { setMatch } = matchSlice.actions;

export const getMatch = (email, counter) => (dispatch) => {
  if (counter === 0) {
    console.log('exit');
    return;
  }
  const nextCounter = counter - 1;

  const apiUrl = `${API_HOST}/match/get?email=${email}`;
  // console.log(apiUrl);
  fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === true) {
        saveState(MATCH_STATE_KEY, result);
        dispatch(setMatch(result));
      } else if (result.status === false) {
        // recurse with timeout until succeed
        setTimeout(() => {
          dispatch(getMatch(email, nextCounter));
        }, 5000);
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => console.log(err));
};

export const updateElo = (email, elo) => () => {
  const apiUrl = `${API_HOST}/match/update?email=${email}&elo=${elo}`;
  console.log(apiUrl);
  fetch(apiUrl, {
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === true) {
        console.log('Success');
      }
    })
    .catch((err) => console.log(err));
};

export async function getElo(email) {
  const apiUrl = `${API_HOST}/match/user?email=${email}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const endMatch = () => (dispatch) => {
  removeState(MATCH_STATE_KEY);
  dispatch(setMatch(null));
};

export const selectMatch = (state) => state.match;

export default matchSlice.reducer;
