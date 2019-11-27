import Modal from 'react-responsive-modal';
import React,{Component} from 'react';
import instance from '../axiossetup';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class EditUser extends Component {

    editForm = React.createRef();

    state = {
        open: false,
        getUser :''
      };

      componentDidUpdate(){
      //  this.popupMessage()
     }

     componentDidMount(){
        this.onOpenModal(this.props.match.params.uuid);
     }

     popupMessage (){
        if(this.props.responseMessage){
            confirmAlert({
                title: 'Response From Server',
                message: this.props.responseMessage,
                buttons: [
                  {
                    label: 'ok',
                    onClick: () =>  {
                        
                    }
                  }
                ]
              });
        }
 
    }

    
    createCustomValidationMessage(ev){
        const target =   ev.target || ev.srcElement;
        const validationmessage = target.getAttribute("data-validationmessage");
        //target.setCustomValidity(validationmessage);
    }
      
      handleSubmit() {
        let isValidationSuccess =  this.editForm.current.reportValidity();
        debugger;
        if(isValidationSuccess){
            let address = {
                primaryAddress : this.editForm.current.elements.primaryAddress.value,
                secondaryAddress : this.editForm.current.elements.secondaryAddress.value,
            }
            let user = {
                uuId : this.editForm.current.elements.uuId.value,
                firstName : this.editForm.current.elements.firstName.value,
                lastName : this.editForm.current.elements.lastName.value,
                phoneNumber : this.editForm.current.elements.phoneNumber.value,
                emailId : this.editForm.current.elements.emailId.value,
                designation : this.editForm.current.elements.designation.value,
                company : this.editForm.current.elements.company.value,
                address : address
            }
            this.onCloseModal();
            
            this.props.editUser(user);
        }else{
            return isValidationSuccess;
        }
        //this.props.editUser(user);
        //event.preventDefault();
      }

      onOpenModal = (uuId) => {
        instance.get('get',{
            params: {
              uuId: uuId
            }
          }) .then(response => {
            this.setState({getUser:response.data,open:true});
          }).catch(error => {
          
          });
  
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
        //this.props.history.goBack();
        this.props.history.push('/users');
      };


    render(){
        const { open } = this.state;
        return(
            <Modal open={open} onClose={this.onCloseModal} center>
            <form ref={this.editForm} onSubmit={e=>e.preventDefault()} >
                <div className="edituser">
                     <div className="fields">
                        <div>UUID</div>
                        <input type="text"  name="uuId" className="field" readOnly  defaultValue={this.state.getUser.uuId} />
                    </div>
                    <div className="fields">
                        <div>First Name</div>
                        <input type="text"  name="firstName" className="field" required  defaultValue={this.state.getUser.firstName} />
                    </div>
                    <div className="fields">
                        <div>Last Name</div>
                        <input type="text"  name="lastName" className="field" required  defaultValue={this.state.getUser.lastName} />
                    </div>
                    <div className="fields">
                        <div>Phone number</div>
                        <input type="text" name="phoneNumber" className="field"  required  defaultValue={this.state.getUser.phoneNumber} />
                    </div>
                    <div className="fields">
                        <div>Email</div>
                        <input type="text" name="emailId" data-validationmessage="Invalid Email" onFocus={this.createCustomValidationMessage.bind(this)} className="field" defaultValue={this.state.getUser.emailId} />
                    </div>
                    <div className="fields">
                        <div>Designation</div>
                        <input type="text" name="designation" data-validationmessage="Invalid Designation" className="field" onFocus ={this.createCustomValidationMessage.bind(this)} required defaultValue={this.state.getUser.designation} />
                    </div>
                    <div className="fields">
                        <div>Company</div>
                        <input type="text"  name="company" className="field" required  defaultValue={this.state.getUser.company} />
                    </div>
                    <div className="fields">
                        <div>Primary Address</div>
                        <input type="text"  name="primaryAddress" className="field" required  defaultValue={this.state.getUser!=''&& this.state.getUser.address && this.state.getUser.address.primaryAddress} />
                    </div>
                    <div className="fields">
                        <div>Secondary Address</div>
                        <input type="text" name="secondaryAddress" defaultValue={this.state.getUser!=''&& this.state.getUser.address && this.state.getUser.address.secondaryAddress} />
                    </div>
                </div>
                
                </form>
                <button  onClick={this.handleSubmit.bind(this)} value="Submit" className="btnEdit">Edit</button>
             </Modal>
        )
       
    }
}

const mapStateToProps = (state) =>{
    return {
        showloader : state.loader.loaderstatus,
        responseMessage : state.response.responseMessage,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
  
    const editUser = function(user){
        return dispatch(actionCreators.editUser(user));
    }
    return {
        editUser
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);