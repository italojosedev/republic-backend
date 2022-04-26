import send from './send';
import confirm from './confirm';

export default {
  '/users/verify/send': {
    post: send,
  },
  '/users/verify/confirm': {
    post: confirm,
  },
};
