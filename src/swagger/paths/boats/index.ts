import addSave from './addSave';
import getById from './getById';
import search from './search';

const Boats = {
  '/boat/:id ': {
    get: getById,
  },
  '/boats/search':{
    post: search
  },
  '/users/saves':{
    post: addSave
  }
}

export default Boats;