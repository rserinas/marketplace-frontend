
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const getPayOption = opt => dispatch => {
    
    let apiUrl = sessionStorage.getItem('apiUrl');
    let data = {
        cart: sessionStorage.getItem('cart'),
        total: sessionStorage.getItem('total'),
        discount: sessionStorage.getItem('discount'),
        subTotal: sessionStorage.getItem('subTotal'),
        pesoTotal: sessionStorage.getItem('pesoTotal'),
        transId: sessionStorage.getItem('transId'),
        payment: opt,
        userId: sessionStorage.getItem('userId')
    };
    console.log(data);
    fetch (`${apiUrl}/user/transact`, {
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
            const fname = sessionStorage.getItem('fname');
            sessionStorage.setItem('transId', data.transId);
            sessionStorage.setItem('paymentUrl', data.paymentUrl);
            sessionStorage.setItem('extTransId', data.extTransId);

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
                pesoTotal:  sessionStorage.getItem('pesoTotal'),
                transId:    sessionStorage.getItem('transId'),
                paymentUrl: sessionStorage.getItem('paymentUrl'),
                extTransId: sessionStorage.getItem('extTransId')
            };
            dispatch({
                type: 'SHOW_PAY_OPTION',
                option: opt,
                payload: client
            });
        }
    });
};

