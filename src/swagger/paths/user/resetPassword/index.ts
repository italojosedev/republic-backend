import send from './send';
import verify from './verify';
import reset from './reset';

export default {
  '/users/reset-password': {
    post: reset,
  },
  '/users/reset-password/send': {
    post: send,
  },
  '/users/reset-password/code-verify': {
    post: verify,
  },
};
