const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    input: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        // case 'SET_INPUT_VALUE':
        //     return {
        //         ...state,
        //         input: action.payload
        //     }
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'LOGIN_ACCOUNT':
            return {
                ...state,
                alert: action.payload
            }; 
        default:
            return state;
    }
}