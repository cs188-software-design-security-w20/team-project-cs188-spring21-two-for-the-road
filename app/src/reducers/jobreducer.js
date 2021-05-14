import {GET_JOBS,  JOBS_LOADING} from '../actions/types'

const initialState = {
    jobs :[],
    loading: false
}
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        case JOBS_LOADING: 
            return {
                ...state,
                loading: true
            }
        default: return state;

    }
}