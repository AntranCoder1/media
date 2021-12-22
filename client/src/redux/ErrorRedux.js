import { GET_POSTS_ERRORS, } from './actions/Post.actions';
import { GET_USER_ERRORS } from './actions/User.actions';

const initialState = { userError: [], postError: [] };

const ErrorRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_ERRORS:
            return {
                postError: action.payload,
                userError: []
            }
        default:
            return state;
    }
}

export default ErrorRedux
