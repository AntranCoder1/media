import { 
    GET_POSTS,
    ADD_POSTS,
    LIKE_POSTS
} from '../redux/actions/Post.actions';

const initialState = {};

const PostRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POSTS:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers],
                    };
                }
                return post
            });
        default:
            return state
    }
}

export default PostRedux
