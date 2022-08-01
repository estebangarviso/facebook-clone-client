import axios, { handleError, handleSuccess } from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const relativePath = '/posts';
const baseUrl = `${axios.defaults.baseURL}${relativePath}`;

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const res = await axios.get(relativePath);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
});

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      path: '/'
    }),
    getPostsByPageNumberAndPageSize: builder.query({
      query: (pageNumber, pageSize) => `?pageNumber=${pageNumber}&pageSize=${pageSize}`
    })
  })
});

export const { useGetPostsByPageNumberAndPageSizeQuery, useGetPostsQuery } = postsApi;

export const addPost = createAsyncThunk('posts/addPost', add);
async function add(formData) {
  console.log('PostService.add formData', formData);
  try {
    const res = await axios.post(relativePath, formData);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
}

export const addComment = createAsyncThunk('comments/addComment', async (formData) => {
  console.log('PostService.addComment formData', formData);
  try {
    const res = await axios.post(relativePath + '/' + formData.get('postId') + '/comments', formData);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
});

export const getAllCommentsByPostId = createAsyncThunk('posts/getAllCommentsByPostId', getAllCommentsById);
async function getAllCommentsById(postId) {
  try {
    const res = await axios.get(relativePath + '/' + postId + '/comments');
    console.log('PostService.getAllCommentsById res', res);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err);
  }
}

const PostService = {
  add,
  getAllCommentsById
};

export default PostService;
