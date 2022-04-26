import clientError from './clientError';
import serverError from './serverError';

export default {
  '4xx': clientError,
  '5xx': serverError,
};
