
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const acceptTOS = data => dispatch => {
    return dispatch({
        type: 'ACCEPT_TOS',
        payload: data
    });
};


export const setState = data => dispatch => {

    let buffer = [];
    buffer.states = [];

    if (data === 'USA') {
        let usa = require('../json/us_states.json');

        let x = Object.keys(usa);
        x.forEach((element) => {
            buffer.states.push(usa[element]);
        });
        buffer.isDefault = false;
    } else if (data === 'Philippines') {
        let phil = require('../json/provinces.json');
        phil.RECORDS.forEach((element) => {
            buffer.states.push(element.provDesc);
        });
        buffer.isDefault = false;
    } else {
        buffer.isDefault = true;
    }
    
    dispatch({
        type: 'SHOW_STATES',
        payload: buffer
    });
};

export const submitSignup = data => dispatch => {
    
    const apiUrl = sessionStorage.getItem('apiUrl');
    // const baseUrl = sessionStorage.getItem('baseUrl');

    fetch (`${apiUrl}/user/put`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        // window.location = `${baseUrl}/login`;
        dispatch({
            type: 'CREATE_ACCOUNT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};