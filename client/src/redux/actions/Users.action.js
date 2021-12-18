import axios from "axios";

export const GET_USERS = "GET_USER";

export const getUsers = () => {
    return (dispatch) => {
      return axios
        .get("/users/")
        .then((res) => {
            dispatch({ type: GET_USERS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};
  