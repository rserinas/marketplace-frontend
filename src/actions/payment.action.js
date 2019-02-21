
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
                total:      sessionStorage.getItem('total'),
                // pesoTotal:  sessionStorage.getItem('pesoTotal'),
            };
            dispatch({
                type: 'SHOW_PAY_OPTION',
                option: opt,
                payload: client
            });
        }
    });
};