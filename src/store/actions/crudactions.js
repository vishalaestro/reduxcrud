import * as actionTypes from './actiontypes';
import instance from '../../axiossetup';

export const saveUsers = ( res ) => {
    return {
        type: actionTypes.LIST_USER,
        result: res
    };
}

export const triggerLoader = (loaderStatus)=>{
  return {
    type: actionTypes.TRIGGER_LOADER,
    result: loaderStatus
};
}

export const responseMessage = (responseMessage) =>{
  return {
    type:actionTypes.RESPONSE_MESSAGE,
    result:responseMessage
  }
}


export const listUser = () => {
    return (dispatch,getState) => {
      dispatch(triggerLoader('true'));
        instance.get('listUsers').then(response => {
            dispatch(saveUsers(response.data))
            dispatch(triggerLoader('false'));
          }).catch(error => {
            dispatch(responseMessage(error.message));
            dispatch(triggerLoader('false'));
          });
    }
};


export const deleteUser = (uuId) => {
  return (dispatch,getState) => {
    dispatch(triggerLoader('true'));
      instance.post('delete',{'uuId':uuId}).then(response => {
        dispatch(responseMessage(response.status));
          dispatch(listUser());
        }).catch(error => {
          dispatch(responseMessage(error.message));
          dispatch(triggerLoader('false'));
        });;
  }
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch(triggerLoader('true'));
      instance.post('edit',user).then(response => {
        dispatch(responseMessage(response.status));
        dispatch(listUser());
        })
        .catch(error => {
          dispatch(responseMessage(error.message));
          dispatch(triggerLoader('false'));
        })
  }
};

export const addUser = (user) => {
    return (dispatch) => {
        instance.post('addUser',user).then(response => {
            dispatch(listUser());
          })
          .catch(error => {
            console.log(error)
          })
    }
};