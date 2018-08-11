import React, { Component } from 'react'
import propTypes from 'prop-types'

import { connect } from 'react-redux'

import { confirmAccount } from '../actions/authentication.action'
import { withRouter } from 'react-router-dom'


import Message from '../components/message'

class ConfirmAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        }
    }


    componentDidMount() {

        const confirmationToken = this.props.match.params.token.trim()

        this.props.confirmAccount(confirmationToken, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors.data
            })
        }
    }

  render() {

    const { errors } = this.state

    return (
        <div>
          {
              errors.key && <Message errorMessage={errors.value} className='alert alert-danger' />
          }       
      </div>
    )
  }
}

//Component PropTypes
ConfirmAccount.propTypes = {
    confirmAccount : propTypes.func.isRequired,
    errors : propTypes.object.isRequired
  }
  
  //Get data via state 
  const mapStateToProps = (state) => ({
    authentication : state.authentication,
    errors : state.errors
  })

  export default connect(mapStateToProps, {confirmAccount})(withRouter(ConfirmAccount))

