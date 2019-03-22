
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const fetchDomainDetails = data => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');
    // let baseUrl = sessionStorage.getItem('baseUrl');

    fetch (`${apiUrl}/domain/get/${data}`)
    .then(res => res.json())
    .then(data => {
        if (data.error === 0) {
            sessionStorage.setItem('ds', JSON.stringify(data));
            //console.log(data);
            dispatch({
                type: 'SHOW_DETAILS',
                payload: data
            });
        }
    })
    .catch((error)=>{
        console.log(error);
    });
    
};