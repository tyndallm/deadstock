
export const requestReducer = (state, action) => {
    return Object.assign({}, state, {
        isFetching: true,
        fetchComplete: false,
    });
}

const createSuccessReducer = (property) => (state, action) => {
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        [property]: action.payload
    });
}

export const failureReducer = (state, action) => {
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        error: action.payload
    });
}

export const fetchAccountsSuccessReducer = createSuccessReducer("accounts");
export const fetchBlockSuccessReducer = createSuccessReducer("currentBlock");
export const fetchNetworkSuccessReducer = createSuccessReducer("network");