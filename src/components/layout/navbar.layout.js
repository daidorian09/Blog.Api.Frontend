import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'

import propTypes from 'prop-types'
import { connect } from "react-redux"

import { signOut } from '../../actions/authentication.action'



import '../../assets/css/style.css'

class Navbar extends Component{

  constructor(props) {
    super(props)
    
    this.onSignOut = this.onSignOut.bind(this)
  }

  onSignOut(event){
    event.preventDefault()

    this.props.signOut(this.props.history)

  }
    render(){

      const { isAuthenticated } = this.props.authentication

      const authRequiredLinks = (                
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/myPosts">My Posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-post">Create Post</Link>
        </li>
          <li className="nav-item">       
          <Link
            to = "/"
            onClick={this.onSignOut} 
            className="nav-link">
            Sign Out
          </Link>   
          </li>
        </ul>
      )

      const guestLinks = (                
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/signin">Login</Link>
        </li>
      </ul>
      )

        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
  
              { !isAuthenticated && <Link className="navbar-brand" to="/">Blog App</Link> } 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                   {
                     isAuthenticated ? authRequiredLinks : guestLinks
                   }
              </div>
            </nav>
        )
    }
}

//Component PropTypes
Navbar.propTypes = {
  signOut : propTypes.func.isRequired,
  authentication : propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authentication : state.authentication,
  errors : state.errors
})

export default connect(mapStateToProps, { signOut })(withRouter(Navbar))
