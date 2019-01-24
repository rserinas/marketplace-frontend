export const changeName = data => dispatch => {
    dispatch({
        type: 'FIRST_ACTION',
        payload: {
            name: data.name
        }
    })
}