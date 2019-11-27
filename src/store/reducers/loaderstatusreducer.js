import { updateObject } from '../reduxutility.js';
import * as actionTypes from '../actions/actiontypes';

const initialState = {
    loaderstatus: ''
};


const loaderreducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.TRIGGER_LOADER : return updateObject( state, { loaderstatus: action.result } );
        default: return state;
    }
};

export default loaderreducer;