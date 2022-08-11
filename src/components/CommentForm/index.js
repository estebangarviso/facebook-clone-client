import React from 'react';
import Form from '../Form';
import FormTextField from '../Form/FormTextField';
import { Box } from '@mui/material';
import schema from './schema';
import { addComment } from '../../services/PostService';
import { useDispatch } from 'react-redux';
import UserAvatar from '../UserAvatar';

const CommentForm = ({ postId, replyTo = undefined, label = 'Write a comment...', ...otherProps }) => {
  const dispatch = useDispatch();
  const handleServiceCallback = async (formData) => {
    // add post id to form data
    formData.append('postId', postId);
    // add reply id to form data
    if (replyTo) {
      formData.append('replyTo', replyTo);
    }

    dispatch(addComment(formData));
  };
  return (
    <Box display='flex' flexDirection='row' {...otherProps}>
      <UserAvatar sx={{ mr: '1rem' }} />
      <Form
        serviceCallback={handleServiceCallback}
        validationSchema={schema}
        enterSubmit={true}
        defaultValues={{
          content: ''
        }}
        autoComplete='off'>
        <Box display='flex' flexDirection='row' gap={1}>
          <FormTextField
            name='content'
            label={label}
            required
            multiline
            size='small'
            variant='filled'
            fullWidth
            InputProps={{ sx: `border-radius: 18px;` }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default CommentForm;
