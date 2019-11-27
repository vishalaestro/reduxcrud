import Spinner from 'react-spinner-material';
import React from 'react';
const LoaderBox = function (props) {
    if(props.showloader === 'true' ){
        return (
             <div className="loader">
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
            </div>
            )
    }else{
        return '';
    }
}
export default LoaderBox;