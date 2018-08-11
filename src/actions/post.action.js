import { POST_TYPES } from '../types/post.types'
import { ERROR_TYPES } from '../types/error.types'

import axios from 'axios'


export const getMyPosts = () => dispatch => {
    axios.get("/api/post/get-my-posts")
    .then(res => dispatch({
        type : POST_TYPES.GET_MY_POSTS,
        payload : res.data
    })).catch(err => dispatch({
        type : ERROR_TYPES.GET_ERRORS,
        payload : {}
    }))
}

export const upsertPost = (data, history) => dispatch => {
    axios.post("/api/post/post", data)
    .then(res => {
        dispatch({
            type : POST_TYPES.CREATE_OR_UPDATE_POST,
            payload : res.data
        })

        history.push(`${history.location.pathname}`)
    })
    .catch(err => 
        dispatch({
            type : ERROR_TYPES.GET_ERRORS,
            payload : err.response.data
        })
    )
}

export const getPostById = (postId) => dispatch => {
    axios.get(`/api/post/get-post/${postId}`)
    .then(res => {
        dispatch({
            type : POST_TYPES.GET_POST,
            payload : res.data
        })
    })
    .catch(err => 
        dispatch({
            type : ERROR_TYPES.GET_ERRORS,
            payload : err.response.data
        })
    )
}