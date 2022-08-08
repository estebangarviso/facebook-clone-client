import axios, { handleError, handleSuccess } from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const relativePath = '/posts';

export const fetchPosts = createAsyncThunk('posts/getPosts', async ({ pageNumber, pageSize } = {}) => {
  const query = new URLSearchParams();
  if (pageNumber) query.append('pageNumber', pageNumber);
  if (pageSize) query.append('pageSize', pageSize);
  const stringQuery = query.toString();
  try {
    const res = await axios.get(`${relativePath}${stringQuery ? '?' + stringQuery : ''}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
});

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
    const res = await axios.post(`${relativePath}/${formData.get('postId')}/comments`, formData);
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
