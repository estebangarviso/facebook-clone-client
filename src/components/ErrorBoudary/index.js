import React, { Component } from 'react';
import { Paper, Typography, Box, SvgIcon } from '@mui/material';
import { Error } from '@mui/icons-material';
import { ReactComponent as _500Logo } from '../../assets/500.svg';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV === 'development') {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <Typography variant='h6' color='error'>
              Something went wrong.
            </Typography>
          </Box>
        );
        // return (
        //   <Paper elevation={3} style={{ padding: '1rem', margin: '1rem' }}>
        //     <Typography variant='h6' color='error'>
        //       <Error />
        //       {this.state.error && (
        //         <>
        //           <pre>{this.state.error?.message}</pre>
        //           <pre>{this.state.error?.stack}</pre>
        //         </>
        //       )}
        //     </Typography>
        //   </Paper>
        // );
      } else {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SvgIcon component={_500Logo} width={200} height={200} />
            <Typography variant='h6' color='error'>
              Something went wrong.
            </Typography>
          </Box>
        );
      }
    }

    return this.props.children;
  }
}
