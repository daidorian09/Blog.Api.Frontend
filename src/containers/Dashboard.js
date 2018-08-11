import React, { Component } from 'react'
import propTypes from 'prop-types'

import { connect } from 'react-redux'

import { getMyPosts } from '../actions/post.action'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getMyPosts()
    }    
    render() {

        return (
            <div>
                <h3>Welcome to your dashboard</h3>
            </div>
            
        )
    }
}

//Component PropTypes
Dashboard.propTypes = {
    getMyPosts : propTypes.func.isRequired
  }
  
  //Get data via state 
  const mapStateToProps = (state) => ({
    post : state.post
  })
  
  //Bind component state and function to redux store
  export default connect(mapStateToProps, { getMyPosts })(Dashboard)