import axios from 'axios'
import { useHistory } from "react-router-dom";
//import Cookies from 'universal-cookie';


import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

//axios.defaults.baseURL = "http://localhost:5000"



//loading user Action
export const loadUser = () => (dispatch, getState) => {
        dispatch({ type: USER_LOADING });

        const config = {
            headers: {
                'Content-Type': 'application/json',


            },
            withCredentials: true

        }
        axios.get('/login/load', config)
            .then(res => {
                if (res) {
                    dispatch({

                        type: USER_LOADED,
                        payload: res.data
                    })
                } else {
                    dispatch({

                        type: AUTH_ERROR,

                    })
                }

            })
            .catch(err => {
                //dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                })
            })
            // Register User
    }
    //Register user
export const register = (formData) => dispatch => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
               //  "Access-Control-Allow-Origin": "http://localhost:3000/",
                 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

            },
            withCredentials: true


        }
        // const body = JSON.stringify({ 
		// 	email,
		// 	password,
		// 	firstName,
		// 	lastName,
		// 	sid,
		// 	YearLevel,
		// 	gradTerm,
		// 	major,
		// 	minor,
		// 	club,
		// 	honorStudent,
		// 	resume,
		// 	profileImage,
		// 	StudentORrecruiter })


        axios.post('/signup', formData, config)
            .then(res => {
                dispatch({
                        type: REGISTER_SUCCESS,
                        payload: res.data
                    })
				
                    //window.location.replace = 'http://localhost:3000/';
                    //window.location.reload(true);
            })
            .catch(err => {
               // console.log(err)
                dispatch(returnErrors(err.response.data, err.status, 'REGISTER_FAIL'));
                dispatch({


                    type: REGISTER_FAIL
                })
            })
    }
    //logout user
export const logout = () => dispatch => {
	//const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
	//removeCookie('jwt')
	
	dispatch({

		        type: LOGOUT_SUCCESS,
		        //payload: res.data
		})

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    // axios.get('/login/logout', config)
    //     .then((res) => dispatch({

    //         type: LOGOUT_SUCCESS,
    //         //payload: res.data
    //     }))
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data, err.response.status));
    //         dispatch({
    //             type: AUTH_ERROR
    //         })
    //     })
}

//Logi user
export const login = ({ email, password }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // "Access-Control-Allow-Origin": "*",
            // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

        },
        withCredentials: true

    }


    const body = JSON.stringify({ email, password })
    axios.post('/api/v1/users/login', body, config)
        .then(res => {
            dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                // window.location.reload(true);

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({

                type: LOGIN_FAIL
            })
        })
}