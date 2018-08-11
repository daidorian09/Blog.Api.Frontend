import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getMyPosts } from '../../actions/post.action'

class MyPosts extends Component {

    componentDidMount() {
        this.props.getMyPosts()
    }

  render() {

    let { posts } = this.props.post

    posts = posts.data.value.map(post => (
        <tr key={post._id}>
          <td>{post.header}</td>
          <td>{post.isActive ? (<i className="fa fa-check-square" aria-hidden="true"></i>) : <i className="fa fa-times" aria-hidden="true"></i>}</td>
          <td>{!post.isPrivate ? (<i className="fa fa-users" aria-hidden="true"></i>) : <i className="fa fa-low-vision" aria-hidden="true"></i>}</td>
          <td>{post.clickCount}</td>
          <td>{post.tags.map(tag => {
              return `${tag} `
          })}</td>
          <td>
          <Link to={`/update-post/${post._id}`} className="btn btn-default">
                 Update
            </Link>
            </td>
        </tr>
    ))

    return (
        <div>
      {
          posts.length === 0 ? (
              ""
          ) : (
            <div>
                <h4 className="mb-4">My Posts</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                <td>Header</td>
                                <td>Activation Status</td>
                                <td>Public or Private</td>
                                <td>Click Count</td>
                                <td>Tags</td>
                                <td>Operation</td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts}
                            </tbody>
                        </table>
                </div>
          )
        }
        </div>
    )
  }
}

MyPosts.propTypes = {
    post: propTypes.object.isRequired,
    getMyPosts : propTypes.func.isRequired
}
  
  const mapStateToProps = state => ({
    post: state.post
  });
  
  export default connect(mapStateToProps, {getMyPosts})(MyPosts)
