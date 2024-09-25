import { api } from "../../Config/api";
import {
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_SUCCESS,
  REPLY_POST_FAILURE,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_SUCCESS,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_SUCCESS,
} from "./ActionType";

export const getAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.get("/api/posts/");
    // const { data } = await axios.get(`${API_BASE_URL}/api/posts/`);
    console.log("get all posts : ", data);
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("get all posts error", error.message);
    dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error.message });
  }
};

export const getUsersPost = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    console.log("get user posts : ", data);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("get user posts error", error.message);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error.message });
  }
};

export const findPostsByLikeContainUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}/likes`);
    console.log("user liked posts : ", data);
    dispatch({ type: USER_LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("user liked posts error", error.message);
    dispatch({ type: USER_LIKE_POST_FAILURE, payload: error.message });
  }
};

export const findPostsById = (postId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    console.log("find post by id : ", data);
    dispatch({ type: FIND_POST_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("find post by id error", error.message);
    dispatch({ type: FIND_POST_BY_ID_FAILURE, payload: error.message });
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/create`, postData);
    console.log("created post : ", data);
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error - ", error.message);
    dispatch({ type: POST_CREATE_FAILURE, payload: error.message });
  }
};

export const createPostReply = (postData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/reply`, postData);
    console.log("reply post : ", data);
    dispatch({ type: REPLY_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error - ", error.message);
    dispatch({ type: REPLY_POST_FAILURE, payload: error.message });
  }
};

export const createRePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/posts/${postId}/repost`);
    console.log("repost : ", data);
    dispatch({ type: REPOST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error - ", error.message);
    dispatch({ type: REPOST_FAILURE, payload: error.message });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${postId}/likes`);
    console.log("like post : ", data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error - ", error.message);
    dispatch({ type: LIKE_POST_FAILURE, payload: error.message });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/post/${postId}`);
    console.log("delete post : ", data);
    dispatch({ type: POST_DELETE_SUCCESS, payload: postId });
  } catch (error) {
    console.log("catch error - ", error.message);
    dispatch({ type: POST_DELETE_FAILURE, payload: error.message });
  }
};
