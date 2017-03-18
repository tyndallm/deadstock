import {handleActions} from "redux-actions";

import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure,
    fetchBlockRequest,
    fetchBlockSuccess,
    fetchBlockFailure,
    fetchNetworkRequest,
    fetchNetworkSuccess,
    fetchNetworkFailure,
    selectAccount,
} from "../actions/userActions";

import {
    requestReducer,
    fetchAccountsSuccessReducer,
    fetchBlockSuccessReducer,
    fetchNetworkSuccessReducer,
    failureReducer
} from "./reducerUtils";

const initialState = {
    isFetching: false,
    accounts: [],
    coinbase: "",
    selectedAccount: 0,
    currentBlock: 0,
    network: "",
}

const setSelectedAccount = (state, action) => {
    return Object.assign({}, state, {
        selectedAccount: action.payload,
    });
};

export const userReducer = handleActions({
    [fetchAccountsRequest]: requestReducer,
    [fetchAccountsSuccess]: fetchAccountsSuccessReducer,
    [fetchAccountsFailure]: failureReducer,

    [fetchBlockRequest]: requestReducer,
    [fetchBlockSuccess]: fetchBlockSuccessReducer,
    [fetchBlockFailure]: failureReducer,

    [fetchNetworkRequest]: requestReducer,
    [fetchNetworkSuccess]: fetchNetworkSuccessReducer,
    [fetchNetworkFailure]: failureReducer,

    [selectAccount]: setSelectedAccount
}, initialState);
