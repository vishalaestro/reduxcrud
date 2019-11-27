import { updateObject } from '../reduxutility.js';
import * as actionTypes from '../actions/actiontypes';

const initialState = {
    responseMessage: ''
};


const responseMessageReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.RESPONSE_MESSAGE : return updateObject( state, { responseMessage: action.result } );
        default: return state;
    }
};

export default responseMessageReducer;