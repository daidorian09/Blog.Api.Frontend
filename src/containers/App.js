import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'

import store from '../redux/redux.store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from '../components/layout/navbar.layout'
import Footer from '../components/layout/footer.layout'
import Index from '../components/layout/index.layout'

import PrivateRoute from '../components/privateRoute.component'

import Dashboard from './Dashboard'
import MyPosts from './Post/MyPosts'
import CreatePost from './Post/CreatePost'
import UpdatePost from './Post/UpdatePost'

import SignUp from './SignUp'
import SignIn from './SignIn'
import ConfirmAccount from './ConfirmAccount'

import NotFound from './NotFound'

import jwt_decode from 'jwt-decode'
import { setAuthenticationToken } from '../helpers/setAuthenticationToken.helper'

import { signOut } from '../actions/authentication.action'


//Validate token
if(localStorage.devSocialToken){
  setAuthenticationToken(localStorage.blogAppToken)

  const decodedToken = jwt_decode(localStorage.blogAppToken)

  //Validate token expiration
  const now = Date.now() / 1000

  if(decodedToken < now){
    //Call signOut
    store.dispatch(signOut)

    window.location.href = "/signIn"
  }
}

class App extends Component {
    render() {
      return (
        <Provider store = {store}>
          <Router>
            <Fragment>
              <div className = "App">
                <Navbar/>
                  <Route exact path = "/" component = {Index}/>
                  <div className="container">
                  <Switch>
                       <Route exact path = "/signup" component = {SignUp}/>
                       <Route exact path = "/signin" component = {SignIn}/>
                       <Route exact path="/confirm-account/:token" component={ConfirmAccount} />                       
                       <PrivateRoute exact path = "/dashboard" component = {Dashboard}/>
                       <PrivateRoute exact path = "/myPosts" component = {MyPosts}/>
                       <PrivateRoute exact path = "/create-post" component = {CreatePost}/>
                       <PrivateRoute exact path = "/update-post/:postId" component = {UpdatePost}/>
                       <Route  path="*" component={NotFound} />      
                  </Switch>
                  </div>
                <Footer/>
              </div>  
            </Fragment>    
          </Router>
        </Provider>
      )
    }
  }
  
  export default App