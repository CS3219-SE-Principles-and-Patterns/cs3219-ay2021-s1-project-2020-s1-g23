import { createSlice } from '@reduxjs/toolkit';
import { API_HOST } from '../../consts';
import { loadState, removeState, saveState } from '../localStorage';

const MATCH_STATE_KEY = 'match';
const persistedMatch = loadState(MATCH_STATE_KEY);

export const matchSlice = createSlice({
  name: 'match',
  initialState: persistedMatch,
  reducers: {
    setMatch: (state, action) => ({ ...state, ...action.payload }),
    setDifficulty: (state, action) => ({
      ...state,
      difficulty: action.payload,
    }),
  },
});

export const { setMatch, setDifficulty } = matchSlice.actions;

export const getMatch = (id, email, counter, difficulty) => (dispatch) => {
  if (counter === 0) {
    return;
  }
  const nextCounter = counter - 1;

  const apiUrl = `${API_HOST}/match/get?email=${email}`;
  fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === true) {
        fetch(`${API_HOST}/user/profile/interview/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ partner_nickname: result.nickname }),
        })
          .then((iresponse) => iresponse.json())
          .then((iresult) => {
            if (iresult.status === 'success') {
              const finalResult = {
                difficulty,
                interview_id: iresult['data']['_id'],
                ...result,
              };
              saveState(MATCH_STATE_KEY, finalResult);
              dispatch(setMatch(finalResult));
            } else {
              alert(
                'Starting your interview session failed! Please try again!'
              );
            }
          });
      } else if (result.status === false) {
        // recurse with timeout until succeed
        setTimeout(() => {
          dispatch(getMatch(id, email, nextCounter, difficulty));
        }, 5000);
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => console.log(err));
};

export const updateElo = (email, elo) => () => {
  const apiUrl = `${API_HOST}/match/update?email=${email}&elo=${elo}`;
  fetch(apiUrl, {
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === true) {
        console.log('Elo Update Success');
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
