import { 
    GET_POSTS,
    ADD_POSTS,
} from '../redux/actions/Post.actions';

const initialState = {};

const PostRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return action.payload
        case ADD_POSTS:
            return {
                ...state,
                data: ""
            }
        default:
            return state
    }
}

export default PostRedux
