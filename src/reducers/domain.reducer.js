const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    result: {
        has_result: false,
        availability: 'taken',
        suggest: []
    },
    loader: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'GET_LOADER':
            return {
                ...state,
                loader: action.payload
            };
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'DOMAIN_SEARCH':
            return {
                ...state,
                result: action.payload
            }; 
        default:
            return state;
    }
}