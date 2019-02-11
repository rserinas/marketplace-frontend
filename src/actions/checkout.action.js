
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
    let buff = {
        subTotal: data.subTotal,
        discount: disc,
        total: (data.subTotal - disc),
        cart: data.details
    };

    return dispatch({
        type: 'SHOW_TOTAL',
        payload: buff
    });
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
                st = +st + (+a.price * +a.qty);
            });
        
            let disc = 0;
            if (sessionStorage.getItem('discount')) {
                disc = sessionStorage.getItem('discount')
            }

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