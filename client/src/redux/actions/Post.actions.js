import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const LIKE_POSTS = "LIKE_POSTS";
export const UNLIKE_POSTS = "UNLIKE_POST";
export const UPDATE_POSTS = "UPDATE_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";

export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_TRENDS = "GET_TRENDS";

export const GET_POSTS_ERRORS = "GET_POSTS_ERRORS";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios.get("/posts/")
            .then((res) => {
                const array = res.data.slice(0, num);
                dispatch({ type: GET_POSTS, payload: array });
                dispatch({ type: GET_ALL_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    }
};

export const addPost = (data) => {
    return (dispatch) => {
        return axios.post("/posts/", data)
            .then((res) => {
                dispatch({ type: ADD_POSTS, payload: res.data })
            })
            .catch((err) => console.log(err));
    }
};

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: "/posts/like-post/" + postId,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: LIKE_POSTS, payload: { postId, userId } });
            })
            .catch((err) => console.log(err));
    };
};