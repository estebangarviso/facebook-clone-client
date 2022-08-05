import React, { useEffect } from 'react';
import { Dialog, Alert, Box, Button } from '@mui/material';
import { fetchPosts } from '../../services/PostService';
import Post from '../Post';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPosts,
  getPostsStatus,
  getPostsError,
  selectHasMore,
  selectPageNumber
} from '../../app/store/postsSlice';
import InfiniteScroll from 'react-infinite-scroller';

const Timeline = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const hasMore = useSelector(selectHasMore);
  const pageNumber = useSelector(selectPageNumber);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const handleLoadMore = async () => {
    dispatch(fetchPosts({ pageNumber: pageNumber + 1 }));
  };

  const handleLoadPrevious = async () => {
    dispatch(fetchPosts({ pageNumber: pageNumber - 1 }));
  };

  if (postStatus === 'failed') {
    return (
      <Dialog open={true}>
        <Alert severity='error'>{error}</Alert>
      </Dialog>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <InfiniteScroll pageStart={0} loadMore={handleLoadMore} hasMore={hasMore} loader={<Post loading={true} />}>
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </InfiniteScroll>
      {/* {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
      {hasMore && (
        <Button onClick={handleLoadMore} fullWidth>
          Load more
        </Button>
      )} */}
    </Box>
  );
};

export default Timeline;
