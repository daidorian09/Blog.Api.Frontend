import { AUTHENTICATION_TYPES } from '../types/authentication.types'
import { ERROR_TYPES } from '../types/error.types'
import { setAuthenticationToken } from '../helpers/setAuthenticationToken.helper'
import jwt_decode from "jwt-decode"
import axios from 'axios'

export const signUp = (data, history) => dispatch => {
    axios.post("api/auth/sign-up", data)
        .then(res => history.push("/"))
        .catch(err => dispatch({
            type: ERROR_TYPES.GET_ERRORS,
            payload: err.response.data
        }))
}

export const signIn = (data) => dispatch => {
    axios.post("api/auth/sign-in", data)
        .then(res => {
            let token = res.data.data.value
            //Set localstore
            localStorage.setItem("blogAppToken", token)
            //Set token to header
            setAuthenticationToken(token)

            const decodedToken = jwt_decode(token)

            dispatch({
                type: AUTHENTICATION_TYPES.AUTHENTICATE_USER,
                payload: decodedToken
            })

        }).catch(err => dispatch({
            type: ERROR_TYPES.GET_ERRORS,
            payload: err.response
        }))
}

export const confirmAccount = (data, history) => dispatch => {
    axios.get(`/api/auth/confirm-account/${data}`)
        .then(res =>
            history.push("/signIn")
        ).catch(err => dispatch({
            type: ERROR_TYPES.GET_ERRORS,
            payload: err.response.data
        }))
}

export const setUser = (decodedToken) => {
    return {
        type: AUTHENTICATION_TYPES.SET_USER,
        payload: decodedToken
    }
}

export const signOut = (history) => dispatch => {

    axios.post('/api/auth/sign-out')
        .then(res => {

            localStorage.removeItem("blogAppToken")

            setAuthenticationToken(false)

            dispatch({
                type: AUTHENTICATION_TYPES.SIGN_OUT,
                payload: {}
            })

            history.push('/signin')

        }).catch(err => dispatch({
            type: ERROR_TYPES.GET_ERRORS,
            payload: err.response.data
        }))
}
