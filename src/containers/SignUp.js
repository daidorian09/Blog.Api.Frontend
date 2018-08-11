import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { isEmpty } from '../helpers/isEmpty.helper'

import { VALIDATION } from '../constants/validation.constant'

import { connect } from 'react-redux'
import { signUp } from '../actions/authentication.action'

import Message from '../components/message'

import TextField from '../components/form/fields/text.field'

export class SignUp extends Component {
  
  constructor() {
    super()
    this.state = {
      fullName : "",
      email : "",
      password : "",
      errors : {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()   

    const isFormInputsValid =  this.validateSignUpFormInputs()

    if (isFormInputsValid) {
      const newUser = {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password
      }

      this.props.signUp(newUser, this.props.history)
    }
  }

  validateSignUpFormInputs() {
    const {
      fullName,
      email,
      password
    } = this.state
    let errors = {}

    if (isEmpty(fullName) || fullName.length > VALIDATION.FULL_NAME_LENGTH) {
      errors.name = "Name field is required";
    }

    if (isEmpty(email)) {
      errors.email = "Email field is required";
    }

    if (!isEmpty(email)) {
      const emailRegex = new RegExp(VALIDATION.EMAIL_REGEX)
      if (!emailRegex.test(email)) {
        errors.email = "Email address in invalid format";
      }
    }

    if (isEmpty(password) || password.length < VALIDATION.PASSWORD_LENGTH) {
      errors.password = `Password requires at least ${VALIDATION.PASSWORD_LENGTH} characters long`
    }

    this.setState({
      errors: errors
    })

    return isEmpty(errors)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors : nextProps.errors.data
      })
    }
  }

  render() {
    const { errors } = this.state    

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextField
                  placeholder="Enter your full name"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextField
                  placeholder="Enter your email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextField
                  placeholder="Enter your password"
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
SignUp.propTypes = {
  signUp : propTypes.func.isRequired,
  authentication : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

//Get data via state 
const mapStateToProps = (state) => ({
    authentication : state.authentication,
    errors : state.errors
})

//Bind component state and function to redux store
export default connect(mapStateToProps, { signUp })(withRouter(SignUp))