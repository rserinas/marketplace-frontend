
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const showTotal = data => dispatch => {
    
    let disc = 0;
    if (sessionStorage.getItem('discount')) {
        disc = sessionStorage.getItem('discount')
    }
    
    let tempTotal = (data.subTotal - disc)
    let pesoPrice = tempTotal * sessionStorage.getItem('pesoRate');
    sessionStorage.setItem('pesoTotal', pesoPrice);
    let buff = {
        subTotal: data.subTotal,
        discount: disc,
        total: tempTotal,
        pesoTotal: pesoPrice,
        cart: data.details
    };

    return dispatch({
        type: 'SHOW_TOTAL',
        payload: buff
    });
    
    // let tempTotal = (data.subTotal - disc)
    // const fixerUrl = sessionStorage.getItem('fixerUrl');
    // const key = sessionStorage.getItem('fixerApiKey');
    
    // fetch (`${fixerUrl}/latest?access_key=${key}`)
    // .then(res => res.json())
    // .then(subData => {
    //     let pesoPrice = 0;
    //     if (subData.success) {
    //         pesoPrice = (tempTotal/subData.rates.USD) * subData.rates.PHP;
    //     } 
        
    //     sessionStorage.setItem('pesoTotal', pesoPrice);

    //     let buff = {
    //         subTotal: data.subTotal,
    //         discount: disc,
    //         total: tempTotal,
    //         pesoTotal: pesoPrice,
    //         cart: data.details
    //     };

    //     return dispatch({
    //         type: 'SHOW_TOTAL',
    //         payload: buff
    //     });
    // });
    
};


export const fetchNewPrice = (data, qty, i) => dispatch => {

    let apiUrl = sessionStorage.getItem('apiUrl');
    let baseUrl = sessionStorage.getItem('baseUrl');
    data.newQty = qty;
    
    fetch (`${apiUrl}/domain/get-price`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(newData => {
        if (newData.error === 0) {
            
            let r = newData.result;
            let cart = JSON.parse(sessionStorage.getItem('cart'));
            
            cart[i].qty = r.qty;
            cart[i].price = r.price;
            
            sessionStorage.setItem('cart', JSON.stringify(cart));

            let st = 0;
            cart.map((a, i) => {
                st = +st + +a.price;
            });
        
            let disc = 0;
            if (sessionStorage.getItem('discount')) {
                disc = sessionStorage.getItem('discount')
            }
            sessionStorage.setItem('subTotal', st);
            sessionStorage.setItem('discount', disc);
            sessionStorage.setItem('total', (st - disc));
            
            let buff = {
                subTotal: st,
                discount: disc,
                total: (st - disc),
                cart: cart
            };

            return dispatch({
                type: 'SHOW_TOTAL',
                payload: buff
            });
        }
        dispatch({
            type: 'SHOW_ALERT',
            payload: newData
        });
    })
    .catch((error)=>{
        console.log(error);
    });

};