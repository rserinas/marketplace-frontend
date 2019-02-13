const initialState = {
    alert: {
        error: 2,
        msg: ''
    },
    trans: {
        has_option: false
    },
    user: {
        name: '',
        company: '',
        address1: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        email: '',
        status: '',
        subTotal: '',
        discount: '',
        total: ''
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload
            };
        case 'SHOW_PAY_OPTION':
            return {
                ...state,
                trans: {
                    has_option: true,
                    option: action.option
                },
                user: action.payload
            };
        default:
            return state;
    }
}