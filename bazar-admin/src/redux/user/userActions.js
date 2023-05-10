// user.actions.js
import { userActionTypes } from './userTypes';
import { takeLatest, put, all } from 'redux-saga/effects';
import { checkUserSessionSuccess, checkUserSessionFailure } from './user.actions';

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION
});



const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorMessage: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isLoading: true
      };
    case userActionTypes.CHECK_USER_SESSION_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false
      };
    case userActionTypes.CHECK_USER_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    // otros casos de acción...
    default:
      return state;
  }
};

export default userReducer;



function* checkUserSession() {
  try {
    const user = yield getUserFromToken();
    yield put(checkUserSessionSuccess(user));
  } catch (error) {
    yield put(checkUserSessionFailure(error.message));
  }
}

function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, checkUserSession);
}

export function* userSagas() {
  yield all([onCheckUserSession()]);
}
