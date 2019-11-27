import * as actionTypes from '../actions/actiontypes';
import { updateObject } from '../reduxutility.js';

const initialState = {
    results: []
};



const listReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LIST_USER : return updateObject( state, { results: action.result } );
    }
    return state;
};

export default listReducer;