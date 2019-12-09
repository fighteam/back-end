import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePage from './HomePage/homepage'

import MenuPage from './Menu/menu'
import MoviedetailsPage from './Moviedetails/moviedetails'

import {BrowserRouter,Route,Switch,Redirect,withRouter} from 'react-router-dom'

class IndexPage extends React.Component{
    render(){

        return(
            <div>
               <BrowserRouter>
               <Switch>
                   <Route path="/homepage" component={HomePage} history={this.props.history}></Route>
                   <Route path="/menu" component={MenuPage}></Route>
                   <Route path="/moviedetails" component={MoviedetailsPage}></Route>
            
                   <Redirect to="/homepage"></Redirect>
               </Switch>
               </BrowserRouter>
            </div>
        )
    }
}
export default withRouter(IndexPage)
ReactDOM.render(<IndexPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
