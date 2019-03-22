
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};


export const fetchContactDetails = data => dispatch => {
    console.log(data);
    return dispatch({
        type: 'SHOW_DETAILS',
        payload: data
    });
};

export const submitContactInfo = data => dispatch => {
    
    const apiUrl = sessionStorage.getItem('apiUrl');

    fetch (`${apiUrl}/domain/modify-contact-info`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if (data.error === 0) {
            let ds = JSON.parse(sessionStorage.getItem('ds'));
            ds.owner.fname      = data.fname;
            ds.owner.lname      = data.lname;
            ds.owner.org_name   = data.org_name
            ds.owner.position   = data.address3;
            ds.owner.email      = data.email;
            ds.owner.phone      = data.phone;
            ds.owner.fax        = data.fax;
            ds.owner.address1   = data.address1;
            ds.owner.address2   = data.address2;
            ds.owner.city       = data.city;
            ds.owner.state      = data.state;
            ds.owner.country    = data.country;
            ds.owner.zip_code   = data.zip_code;
            ds.owner.status     = data.status;

            sessionStorage.setItem('ds', JSON.stringify(data));
        }
        dispatch({
            type: 'SHOW_ALERT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
    
};
