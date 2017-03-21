import {handleActions} from 'redux-actions';

import {
    fetchListingRequest,
    fetchListingSuccess,
    fetchListingFailure,
    fetchItemDetailsRequest,
    fetchItemDetailsSuccess,
    fetchItemDetailsFailure
} from "../actions/listingActions";

import {
    requestReducer,
    fetchListingSuccessReducer,
    fetchItemDetailsSuccessReducer,
    failureReducer,
} from "./reducerUtils";

const initialState = {
    isFetching: false,
    listing: {},
}

export const listingReducer = handleActions({
    [fetchListingRequest]: requestReducer,
    [fetchListingSuccess]: fetchListingSuccessReducer,
    [fetchListingFailure]: failureReducer,
    [fetchItemDetailsRequest]: requestReducer,
    [fetchItemDetailsSuccess]: fetchItemDetailsSuccessReducer,
    [fetchItemDetailsFailure]: failureReducer,
}, initialState);