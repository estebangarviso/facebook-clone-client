import React, { useContext, useState, useEffect, useRef } from 'react';
import Form from '../Form';
import {
  Box,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Button,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PostService from '../../services/PostService';
import schema from './schema';
import FormInputBase from '../Form/FormInputBase';
import FormMediaUploadButton from '../Form/FormMediaUploadButton';
import FormButton from '../Form/FormButton';
import GloabaContext from '../../context';
import UserAvatar from '../UserAvatar';
import { Friends as FriendsIcon } from '../../assets/icons/img';
import { FontAwesomeSvgIcon } from '../../assets/icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const PostForm = () => {
  const matchesWidth = useMediaQuery('(min-width:583.99px)');
  const descriptionElementRef = useRef();
  const [open, setOpen] = useState(false);
  const { auth } = useContext(GloabaContext);
  const [paperHeight, setPaperHeight] = useState(`${window.innerHeight * 0.8}px`);

  useEffect(() => {
    const handleResize = () => {
      setPaperHeight(`${window.innerHeight * 0.8}px`);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = (res) => {
    console.log('handleSuccess', res);
    setOpen(false);
  };

  return (
    <>
      <Paper sx={{ py: '1rem', px: '1rem' }}>
        <Button onClick={() => setOpen(true)}>Add Post</Button>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        PaperProps={{
          sx: {
            height: paperHeight,
            width: matchesWidth ? '500px' : '424.219px',
            minHeight: '428px'
          },
          component: Form,
          serviceCallback: PostService.add,
          validationSchema: schema,
          popUpError: true,
          onSuccess: handleSuccess
        }}
        aria-labelledby='post-form-dialog-title, post-form-dialog-actions'
        aria-describedby='post-form-dialog-description'>
        <DialogTitle id='post-form-dialog-title'>
          <Box sx={{ textAlign: 'center' }}>
            Create post
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                backgroundColor: 'secondary.button',
                '&:hover': { backgroundColor: 'action.custom.secondary' }
              }}
              color='inherit'>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component='div' display='flex'>
            <UserAvatar sx={{ mr: '1rem' }} />
            <Box display='flex' flexDirection='column' alignItems='flex-start'>
              <Typography
                variant='subtitle2'
                component='span'
                sx={{ fontWeight: '600', fontSize: '.9375rem', fontFamily: 'inherit' }}>
                {auth.currentUser.fullname}
              </Typography>
              <Button
                variant='contained'
                size='small'
                color='secondary'
                text='inherit'
                sx={{
                  textTransform: 'none',
                  boxShadow: 'none',
                  p: '4px 8px',
                  '> *': { fontWeight: '600', lineHeight: '1.33' }
                }}>
                <Box sx={{ mr: '4px' }} display='flex'>
                  <FriendsIcon />
                </Box>
                <Typography variant='caption' color='text.primary'>
                  Friends
                </Typography>
                <FontAwesomeSvgIcon icon={faCaretDown} sx={{ fontSize: '.8125rem', color: 'text.primary' }} />
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers={true} sx={{ height: '100%', borderBottom: 'none' }}>
          <DialogContentText ref={descriptionElementRef} id='post-form-dialog-description' tabIndex={-1}>
            <FormInputBase
              name='content'
              placeholder={`What's on your mind, ${auth.currentUser.name.first}`}
              required
              multiline
              fullWidth
              sx={{
                fontSize: '1.5rem',
                lineHeight: '1.1667'
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions id='post-form-dialog-actions'>
          <Box sx={{ width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={0.5}>
              <FormMediaUploadButton
                name='media'
                label='Photo/Video'
                iconProps={{ sx: { fontSize: '33px', color: 'success.main', backgroundColor: 'dark' } }}
                labelProps={{ sx: { color: 'grey.500', ml: '.5rem' } }}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none'
                }}
                variant='text'
                fullWidth
              />
            </Stack>
            <FormButton type='submit' variant='contained' color='primary' sx={{ flex: '1' }} fullWidth>
              Post
            </FormButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostForm;
