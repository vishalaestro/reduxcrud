import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Route,Switch } from 'react-router-dom';
import asyncComponent from '../hoc/asyncComponent';


const asyncEditUser = asyncComponent(()=>{
    return import ('./edituser');
});

class ListUser extends Component {

    componentDidMount(){
        console.log(this.props);
        this.props.listUsers(); 
    }

    
    intiateDeleteUser(uuId){
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  {
                    this.props.deleteUser(uuId)
                }
              },
              {
                label: 'No',
                onClick: () => console.log('')
              }
            ]
          });
       
    }


    routeEditUser(uuId){
        this.props.history.push('users/editUser/'+uuId);
    }

    render(){
      
        return (
            <div>
                 <div className="flex-container">
                    {this.props.listUser.map(user => (
                        <div key={user.uuId} className="card">
                            <div className="imgContainer">
                            <img src={user.profileImage} alt="userimage" className="imgStyle" />
                            </div>
                            <div className="container">
                                <h4><b>{user.firstName} {user.lastName}</b></h4>
                                <p>{user.designation}</p>
                                <p>{user.company}</p>
                                <div > 
                                    <button onClick = {this.intiateDeleteUser.bind(this,user.uuId)}  className="btn">Delete</button>
                                    <button onClick={this.routeEditUser.bind(this,user.uuId)} className="btnEdit">Edit</button>
                                </div>
                            </div>
                        </div>
                        
                    ))}

                    {this.props.listUser.length===0 &&
                    <h1> No data found  </h1>
                    }
                   
                </div>
                <Switch>
                    <Route path="/users/editUser/:uuid"  component={asyncEditUser}></Route>
                </Switch> 
            </div>
           
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        listUser: state.list.results
    }
}

const mapDispatchToProps = dispatch => {
    const listUsers  = function(){
        return dispatch(actionCreators.listUser());
    }
    const deleteUser = function(uuid){
        return dispatch(actionCreators.deleteUser(uuid));
    }
    return {
        listUsers,
        deleteUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);