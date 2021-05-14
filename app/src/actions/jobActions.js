import axios from "axios";
import {GET_JOBS,  JOBS_LOADING} from './types';

//axios.defaults.baseURL = "http://localhost:5000"


export const getJobs = (userId) => dispatch => {
    dispatch(setJobsLoading());
    const config = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            
        },
    }
    const id = JSON.stringify({userId});
    axios
        .get('/jobs/jobs',  config).then(res => {
            dispatch({
                    type:   GET_JOBS,
                    payload: res.data

            })
        })
   
}


export const setJobsLoading = () => {
    return {
        type: JOBS_LOADING,
      
    }
}