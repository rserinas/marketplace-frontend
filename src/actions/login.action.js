
// export const setInputValue = data => dispatch => {
//     return dispatch({
//         type: 'SET_INPUT_VALUE',
//         payload: data
//     });
// };

export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const submitLogin = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');
    let baseUrl = sessionStorage.getItem('baseUrl');

    fetch (`${apiUrl}/login`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error === 0) {
            sessionStorage.setItem('userId', data.user_id);
            sessionStorage.setItem('email', data.email);
            window.location = `${baseUrl}/market-page`;
        }
        dispatch({
            type: 'LOGIN_ACCOUNT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};