import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MediaIcon } from '../../../assets/icons';
import { Button, Typography, Dialog, Alert } from '@mui/material';

const FormMediaUploadButton = ({ name, label, sx, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <Button
              color={!!error ? 'error' : 'primary'}
              aria-label='upload picture'
              component='label'
              startIcon={<MediaIcon sx={{ fontSize: '33px', color: 'success.main', backgroundColor: 'dark' }} />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                ...sx
              }}
              {...otherProps}>
              <input
                hidden
                type='file'
                accept='video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif'
                {...field}
              />
              {label && <Typography sx={{ color: 'grey.500', ml: '.5rem' }}>{label}</Typography>}
            </Button>
            <Dialog open={!!error}>{error && <Alert severity='error'>{error}</Alert>}</Dialog>
          </>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default FormMediaUploadButton;
