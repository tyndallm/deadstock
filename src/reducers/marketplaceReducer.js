import {handleActions} from 'redux-actions';

import {
    fetchListingsRequest,
    fetchListingsSuccess,
    fetchListingsFailure,
} from "../actions/marketplaceActions";

import {
    requestReducer,
    fetchListingsSuccessReducer,
    failureReducer
} from "./reducerUtils";

const initialState = {
    isFetching: false,
    listings: [],
}

export const marketplaceReducer = handleActions({
    [fetchListingsRequest]: requestReducer,
    [fetchListingsSuccess]: fetchListingsSuccessReducer,
    [fetchListingsFailure]: failureReducer,
}, initialState);