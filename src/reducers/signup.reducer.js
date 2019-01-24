const initialState = {
    name: "Raineir"
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FIRST_ACTION':
            return {
                ...state,
                name: action.payload.name
            }; 
        default:
            return state;
    }
}