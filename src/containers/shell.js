import React,{Component} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ListUser from '../components/listuser';
import {Route,Redirect,Switch} from 'react-router-dom';



class Shell extends Component {

    render(){
      
        return (
            <div>
                <Switch>
                    <Route path="/users"  component={ListUser}></Route>
                    <Redirect from="/"  to="/users" />
                </Switch> 
            </div>
                
           
        )
    }
}



export default Shell;