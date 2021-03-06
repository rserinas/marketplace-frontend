
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
            sessionStorage.setItem('fname', data.fname);
            sessionStorage.setItem('lname', data.lname);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('phone', data.phone);
            sessionStorage.setItem('status', data.status);
            sessionStorage.setItem('sms_verify', data.sms_verify);
            sessionStorage.setItem('domains', data.domain);
            sessionStorage.setItem('domains_list', JSON.stringify(data.domain_list));
            sessionStorage.setItem('dev_sites_list', JSON.stringify(data.dev_site_list));
            window.location = `${baseUrl}/checkout`;
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