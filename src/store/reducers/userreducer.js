import * as actionTypes from '../actions/actiontypes';
import { updateObject } from '../reduxutility.js';

const initialState = {
    user: ''
};

const storeUsers = ( state ) => {
    return updateObject( state, { results: state.user } );
};

const userReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_USER : return storeUsers(state, action);
    }
    return state;
};

export default userReducer;