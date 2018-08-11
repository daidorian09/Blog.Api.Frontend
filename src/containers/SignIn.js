import React, { Component } from 'react'
import propTypes from 'prop-types'

import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { signIn } from '../actions/authentication.action'

import { isEmpty } from '../helpers/isEmpty.helper'
import { VALIDATION } from '../constants/validation.constant'

import TextField from '../components/form/fields/text.field'

import Message from '../components/message'

export class SignIn extends Component {

    constructor() {
        super()
        this.state = {
          email : "",
          password : "",
          errors : {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
    
      onChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      onSubmit(event) {
        event.preventDefault()

        const isLoginFormValid = this.validateLoginFormInputs()

        if (isLoginFormValid) {
          const login = {
            email: this.state.email,
            password: this.state.password
          }

          this.props.signIn(login)
        }
      }

      componentWillMount(){
        // debugger;
        if(this.props.authentication.isAuthenticated){
          this.props.history.push("/dashboard")
        }
      }

      componentWillReceiveProps(nextProps){

        if(nextProps.authentication.isAuthenticated){
          this.props.history.push("/dashboard")
        }

        if(nextProps.errors.data){
          this.setState({
            errors : nextProps.errors.data.data
          })
        }
      }

      validateLoginFormInputs() {
        const {
          email,
          password
        } = this.state
        let errors = {}

        if (isEmpty(email)) {
          errors.email= "Email field is required";
        }

        if (!isEmpty(email)) {
          const emailRegex = new RegExp(VALIDATION.EMAIL_REGEX)
          if (!emailRegex.test(email)) {
            errors.email = "Email address in invalid format";
          }
        }

        if (isEmpty(password) || password.length < VALIDATION.PASSWORD_LENGTH) {
          errors.password = `Password requires ${VALIDATION.PASSWORD_LENGTH} characters long`
        }

        this.setState({
          errors: errors
        })

        return isEmpty(errors)

      }
    

      render() {
        const { errors } = this.state
    
        return (

          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">
                    Login your account
                  </p>
                  <form onSubmit={this.onSubmit}>
                    <TextField
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
    
                    <TextField
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />                
                   
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>    
                  {
                     errors.key && <Message message={errors.value} className='alert alert-danger' />
                  }        
                </div>
               
              </div>
            </div>
          </div>
        );
      }
}
//Component PropTypes
SignIn.propTypes = {
  signIn : propTypes.func.isRequired,
  authentication : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

//Get data via state 
const mapStateToProps = (state) => ({
  authentication : state.authentication,
  errors : state.errors
})

//Bind component state and function to redux store
export default connect(mapStateToProps, {signIn})(withRouter(SignIn))

