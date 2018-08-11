import React, { Component } from 'react'

import{ Link, withRouter } from 'react-router-dom'


import TextField from '../../components/form/fields/text.field'
import TextArea from '../../components/form/fields/textArea.field'
import Message from '../../components/message'

import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { upsertPost } from '../../actions/post.action'

import { VALIDATION } from '../../constants/validation.constant'
import { isEmpty } from '../../helpers/isEmpty.helper'

class CreatePost extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            header : "",
            text : "",
            isPrivate : false,
            tags : "",
            errors: {},
            message : {}
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        if (Object.keys(nextProps.errors).length !== 0) {
          this.setState({ errors: nextProps.errors.data.data})
        }

        if (nextProps.post.post) {
            this.setState({ message: nextProps.post.post.data})
          }
      }

      
    
    onSubmit(event) {
        event.preventDefault()

        const isLoginFormValid = this.validateCreatePostFormInputs()

        if(isLoginFormValid) {
            const tagsArray = this.state.tags.split(/\s+/).map(item => {
                return `#${item}`
            })
    
            const post = {
                text : this.state.text,
                header : this.state.header,
                tags : tagsArray,
                isPrivate : this.state.isPrivate
            }
    
            this.props.upsertPost(post, this.props.history)
        }        
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    validateCreatePostFormInputs() {
        const {
          text,
          header,
          tags
        } = this.state
        let errors = {}

        if (isEmpty(header)) {
          errors.header= "Header field is required";
        }

        if (isEmpty(text)) {
          errors.text = 'Text field is required'
        }

        if (text.length > VALIDATION.TEXT_LENGTH) {
            errors.text = `Text field exceeds ${VALIDATION.TEXT_LENGTH} characters`
        }

        if(isEmpty(tags)) {
            errors.tags = 'Minimum one tag is required'
        }

        this.setState({
          errors: errors
        })

        return isEmpty(errors)

      }

  render() {
      const { errors, message }  = this.state
    return (
        <div className="section creat-post">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Post</h1>
              <p className="lead text-center">Publish your post</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextField
                placeholder="* Post Header"
                name="header"
                value={this.state.header}
                onChange={this.onChange}
                error={errors.header}
                />
                <TextField
                placeholder="* Tags e.g test c# today'sgoodday mondayVibes etc..."
                name="tags"
                value={this.state.tags}
                onChange={this.onChange}
                error={errors.tags}
                />
                <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" name="isPrivate" onChange={this.onChange} value={this.state.isPrivate}/>
                <label className="form-check-label">
                Post Status | Public or Private
               </label>
                </div>
                <TextArea
                    placeholder="* Post Content"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                    info="Brief info about post"
                  />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
              {
                  errors.key && (<Message message={errors.value} className="alert alert-danger"/>)
              }
              {
                  message.key && (<Message message={'Post is successfully created'} className="alert alert-success" />)
              }
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

CreatePost.propTypes = {
    upsertPost : propTypes.func.isRequired,
    errors: propTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    errors: state.errors,
    post : state.post
  }) 

export default connect(mapStateToProps, { upsertPost })(withRouter(CreatePost))