import { combineReducers } from 'redux';
import UserRedux from "./UserRedux";
import UsersRedux from './UsersRedux';
import PostRedux from './PostRedux';
import ErrorRedux from './ErrorRedux';

export default combineReducers({
    UserRedux,
    UsersRedux,
    PostRedux,
    ErrorRedux,
});