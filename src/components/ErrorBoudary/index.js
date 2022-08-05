import React, { Component } from 'react';
import { Paper, Typography, Box, SvgIcon } from '@mui/material';
import { Error } from '@mui/icons-material';
import { ReactComponent as _500Logo } from '../../assets/500.svg';
import { ENV } from '../../app/config';

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
      if (ENV === 'development') {
        return (
          <Paper elevation={3} style={{ padding: '1rem', margin: '1rem' }}>
            <Typography variant='h6' color='error'>
              {this.state.error && (
                <>
                  <pre>
                    <Error sx={{ mr: '1rem' }} />
                    {this.state.error?.message}
                  </pre>
                  <pre>{this.state.error?.stack}</pre>
                </>
              )}
            </Typography>
          </Paper>
        );
      } else {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}>
            <Box sx={{ width: '800px', maxWidth: '100%', height: '100vh' }}>
              <SvgIcon component={_500Logo} sx={{ width: '100%', height: '100%' }} inheritViewBox />
            </Box>
          </Box>
        );
      }
    }

    return this.props.children;
  }
}
