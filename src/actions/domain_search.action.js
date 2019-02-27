
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const goCheckout = data => dispatch => {
    let result = {
        has_result: false,
        availability: 'taken',
        suggest: []
    };
    dispatch({
        type: 'DOMAIN_SEARCH',
        payload: result
    });
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
            // const fixerUrl = sessionStorage.getItem('fixerUrl');
            // const key = sessionStorage.getItem('fixerApiKey');
            // fetch (`${fixerUrl}/latest?access_key=${key}`)
            // .then(res => res.json())
            // .then(subData => {
            //     let toPush = {};
            //     if (subData.success) {
            //         data.pesoPrice = (data.price/subData.rates.USD) * subData.rates.PHP;
            //     } else {
            //         console.log(subData);
            //         data.pesoPrice = 0 ;
            //     }
            //     dispatch({
            //         type: 'DOMAIN_SEARCH',
            //         payload: data
            //     });
            // });
            data.pesoPrice = data.price * sessionStorage.getItem('pesoRate');

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