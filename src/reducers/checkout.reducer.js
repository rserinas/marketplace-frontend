const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    trans: {
        subTotal: 0,
        discount: 0,
        total: 0,
        cart: [{}]
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'SHOW_TOTAL':
            return {
                ...state,
                trans: action.payload
            }; 
        default:
            return state;
    }
}