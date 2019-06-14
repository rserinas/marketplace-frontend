
export const showAlert = data => dispatch => {
    return dispatch({
        type: 'SHOW_ALERT',
        payload: data
    });
};

export const fetchProfile = data => dispatch => {

    const apiUrl = sessionStorage.getItem('apiUrl');
    const userId = sessionStorage.getItem('userId');
    
    fetch (`${apiUrl}/user/get/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.error === 1) {
        dispatch({
          type: 'SHOW_ALERT',
          payload: data
          
        });
        console.log("nageror")
      } else {
        
        dispatch({
          type: 'SHOW_PROFILE',
          payload: data
        });
        console.log(JSON.stringify(data))
      }
    })
    .catch((error)=>{
        console.log(error);
    });
};


export const updateUser = data => dispatch => {

    const apiUrl = sessionStorage.getItem('apiUrl');
    console.log('data: ', data);
    fetch (`${apiUrl}/user/update`, {
        method: 'POST',
        dataType: 'jsonp',
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: data
        });
    })
    .catch((error)=>{
        console.log(error);
    });
};