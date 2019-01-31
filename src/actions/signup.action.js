
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

export const submitSignup = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');
    
    fetch (`${apiUrl}/user/put`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'CREATE_ACCOUNT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};