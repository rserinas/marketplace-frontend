
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
      if (data.error == 1) {
        dispatch({
          type: 'SHOW_ALERT',
          payload: data
        });
      } else {
        console.log(data);
        dispatch({
          type: 'SHOW_PROFILE',
          payload: data
        });
      }
    })
    .catch((error)=>{
        console.log(error);
    });
};