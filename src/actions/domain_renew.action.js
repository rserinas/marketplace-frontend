
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};

export const sendDomainRenew = data => dispatch => {

    const apiUrl = sessionStorage.getItem('apiUrl');
    // console.log(data);
    fetch (`${apiUrl}/domain/renew`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error == 1) {
            dispatch({
                type: 'SHOW_ALERT',
                payload: data
            });
        } else {
            dispatch({
                type: 'SHOW_ORDER',
                payload: data
            });
        }
    })
    .catch((error)=>{
        console.log(error);
    });
};