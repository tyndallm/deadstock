import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import anotherReducer from './user/userReducer';
import {userReducer} from './reducers/userReducer';
import {marketplaceReducer} from './reducers/marketplaceReducer';

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  marketplace: marketplaceReducer,
})

export default reducer
