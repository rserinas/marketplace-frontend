
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};

export const sendPrivacyState = data => dispatch => {

    const apiUrl = sessionStorage.getItem('apiUrl');

    fetch (`${apiUrl}/domain/modify-whois-privacy`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
};