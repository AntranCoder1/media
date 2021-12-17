import { 
    GET_USER,
} from './actions/User.actions';

const initialState = {};

const UserRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        default:
            return state;
    }
}

export default UserRedux
