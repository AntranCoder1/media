import {
    GET_USERS
} from './actions/Users.action';

const initialState = {};

const UsersRedux = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
}

export default UsersRedux

