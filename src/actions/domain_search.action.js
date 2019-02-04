
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const submitDomain = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');

    fetch (`${apiUrl}/domain/search`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error === 1) {
            dispatch({
                type: 'SHOW_ALERT',
                payload: data
            });
        }
        else {
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