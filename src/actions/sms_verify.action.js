
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const submitSms = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');

    fetch (`${apiUrl}/sms/verify`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error === 0) {
            sessionStorage.setItem('sms_verify', 1);
        }
        dispatch({
            type: 'SHOW_ALERT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};