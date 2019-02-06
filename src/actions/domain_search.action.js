
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const goCheckout = data => dispatch => {
    dispatch({
        type: 'GET_CHECKOUT',
        payload: data
    });
};


export const submitDomain = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');
    dispatch({
        type: 'GET_LOADER',
        payload: true
    });
    fetch (`${apiUrl}/domain/search`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'GET_LOADER',
            payload: false
        });
        if (data.error === 1) {
            dispatch({
                type: 'SHOW_ALERT',
                payload: data
            });
        }
        else {
            console.log(data);
            dispatch({
                type: 'DOMAIN_SEARCH',
                payload: data
            });
        }
    })
    .catch((error)=>{
        console.log(error);
    });
    
};