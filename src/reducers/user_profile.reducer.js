const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    rec: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'SHOW_PROFILE':
            return {
                ...state,
                rec: action.payload
            };
        default:
            return state;
    }
}