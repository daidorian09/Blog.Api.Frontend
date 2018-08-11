import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import propTypes from 'prop-types'


const PrivateRoute = ({component : Component, authentication, ...rest}) => (
    <Route {...rest}
    render = {props => 
        authentication.isAuthenticated ? (<Component {...props} />) : (<Redirect to = "/signin"/>)
    }
    />
)

PrivateRoute.propTypes = {
    authentication : propTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  authentication : state.authentication,
  errors : state.errors
})


export default connect(mapStateToProps)(PrivateRoute)
