import { 
    GET_USER,
    UPLOAD_PICTURE,
} from './actions/User.actions';

const initialState = {};

const UserRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            }
        default:
            return state;
    }
}

export default UserRedux
