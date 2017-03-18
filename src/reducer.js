import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import anotherReducer from './user/userReducer';
import {userReducer} from './reducers/userReducer';

const reducer = combineReducers({
  routing: routerReducer,
  user: anotherReducer,
  other: userReducer
})

export default reducer
