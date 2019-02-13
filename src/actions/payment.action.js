
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const getPayOption = opt => dispatch => {
    let apiUrl = sessionStorage.getItem('apiUrl');
    let userId = sessionStorage.getItem('userId');
    console.log('userId: ', sessionStorage.getItem('userId'));
    dispatch({
        type: 'GET_LOADER',
        payload: true
    });
    fetch (`${apiUrl}/user/get/${userId}`)
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
            const fname = sessionStorage.getItem('fname');

            let client = {
                name:       data.fname + ' ' + data.lname,
                company:    data.company,
                address1:   data.address1,
                city:       data.city,
                state:      data.state,
                country:    data.country,
                zip:        data.zip_code,
                email:      data.email,
                status:     data.user_status,
                subTotal:   sessionStorage.getItem('subTotal'),
                discount:   sessionStorage.getItem('discount'),
                total:      sessionStorage.getItem('total')
            };
            dispatch({
                type: 'SHOW_PAY_OPTION',
                option: opt,
                payload: client
            });
        }
    });
};

// export const submitLogin = data => dispatch => {
    
//     let apiUrl = sessionStorage.getItem('apiUrl');
//     let baseUrl = sessionStorage.getItem('baseUrl');

//     fetch (`${apiUrl}/login`, {
//         method: 'POST',
//         dataType: 'jsonp',
//         body: JSON.stringify(data),
//     })
//     .then(res => res.json())
//     .then(data => {
//         if (data.error === 0) {
//             sessionStorage.setItem('userId', data.user_id);
//             sessionStorage.setItem('fname', data.fname);
//             sessionStorage.setItem('lname', data.lname);
//             sessionStorage.setItem('email', data.email);
//             sessionStorage.setItem('phone', data.phone);
//             window.location = `${baseUrl}/market-page`;
//         }
//         dispatch({
//             type: 'LOGIN_ACCOUNT',
//             payload: data
//         });
//     })
//     .catch((error)=>{
//         console.log(error);
//     });
    
// };