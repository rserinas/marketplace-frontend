const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    domain: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'SHOW_DETAILS':
            return {
                ...state,
                domain: action.payload
            }
        default:
            return state;
    }
}