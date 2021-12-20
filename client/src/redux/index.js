import { combineReducers } from 'redux';
import UserRedux from "./UserRedux";
import UsersRedux from './UsersRedux';
import PostRedux from './PostRedux';

export default combineReducers({
    UserRedux,
    UsersRedux,
    PostRedux
});