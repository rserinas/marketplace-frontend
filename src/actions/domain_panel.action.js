
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
            // sessionStorage.setItem('userId', data.user_id);
            // sessionStorage.setItem('fname', data.fname);
            // sessionStorage.setItem('lname', data.lname);
            // sessionStorage.setItem('email', data.email);
            // sessionStorage.setItem('phone', data.phone);
            // sessionStorage.setItem('status', data.status);
            // sessionStorage.setItem('sms_verify', data.sms_verify);
            // sessionStorage.setItem('domains', data.domain);
            // window.location = `${baseUrl}/checkout`;
            console.log(data);
        }
        // dispatch({
        //     type: 'SHOW_DETAILS',
        //     payload: data
        // });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};