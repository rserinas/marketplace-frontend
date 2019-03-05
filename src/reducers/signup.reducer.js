const initialState = {
    record: {},
    btnEnabled: false,
    alert: {
        error: 2,
        msg: ''
    },
    country: {
        isDefault: true,
        states: [],
    },
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'ACCEPT_TOS':
            return {
                ...state,
                btnEnabled: action.payload
            };
        case 'SHOW_STATES':
            return {
                ...state,
                country: action.payload
            };
        case 'CREATE_ACCOUNT':
            return {
                ...state,
                alert: action.payload
            }; 
        default:
            return state;
    }
}