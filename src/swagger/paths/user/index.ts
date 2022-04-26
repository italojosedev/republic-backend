import store from './store';
import list from './list';
import getById from './getById';
import update from './update';
import signIn from './signIn';
import verify from './verify';
import resetPassword from './resetPassword';
import sendCode from './sendCode';
import validateCode from './validateCode';
import updateToLessee from './updateToLessee';

const User = {
  '/users': {
    post: store,
    get: list,
  },
  '/signup/sendCode': {
    post: sendCode,
  },
  '/signup/validateCode': {
    post: validateCode,
  },
  '/users/{userId}': {
    get: getById,
    put: update,
  },
  '/users/updateToLessee': {
    post: updateToLessee,
  },
  '/signin': {
    post: signIn,
  },
  ...verify,
  ...resetPassword,
};

export default User;
