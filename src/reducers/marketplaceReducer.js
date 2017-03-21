import {handleActions} from 'redux-actions';

import {
    fetchListingsRequest,
    fetchListingsSuccess,
    fetchListingsFailure,
    createListingRequest,
    createListingSuccess,
    createListingFailure,
} from "../actions/marketplaceActions";

import {
    requestReducer,
    fetchListingsSuccessReducer,
    failureReducer,
    createListingSuccessReducer
} from "./reducerUtils";

const initialState = {
    isFetching: false,
    listings: [],
}

export const marketplaceReducer = handleActions({
    [fetchListingsRequest]: requestReducer,
    [fetchListingsSuccess]: fetchListingsSuccessReducer,
    [fetchListingsFailure]: failureReducer,

    [createListingRequest]: requestReducer,
    [createListingSuccess]: createListingSuccessReducer,
    [createListingFailure]: failureReducer,
}, initialState);