const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        default:
            return state;
    }
}