const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    dom: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'SHOW_ORDER':
            return {
                ...state,
                dom: action.payload
            };
        default:
            return state;
    }
}