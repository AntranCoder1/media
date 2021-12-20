import { 
    GET_POSTS
} from '../redux/actions/Post.actions';

const initialState = {};

const PostRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return action.payload
        default:
            return state
    }
}

export default PostRedux
