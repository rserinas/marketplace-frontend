
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};

export const sendParkInfo = data => dispatch => {

    const apiUrl = sessionStorage.getItem('apiUrl');

    fetch (`${apiUrl}/domain/modify-parkpage`, {
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