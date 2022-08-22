import { Badge, IconButton, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { BigAvatar, Button, UploadIcon, DeleteIcon } from './StyledComponents';
import { Box } from '@mui/material';

const FormAvatarUpload = ({ name, label, ...otherProps }) => {
  const [avatar, setAvatar] = useState('');
  const theme = useTheme();
  const { control, reset } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, ...otherFieldProps }, fieldState: { error } }) => {
        const handleReset = () => {
          reset({ [name]: '' });
          setAvatar('');
          console.log('reset:before', 'field value is', otherFieldProps.value);
        };

        const handleChange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = (e) => {
            const dataUrl = e.target.result; // blob://adadasdasd
            setAvatar(dataUrl);
          };
          reader.readAsDataURL(file);

          return onChange(e);
        };

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Badge
              badgeContent={
                otherFieldProps.value ? (
                  <IconButton onClick={handleReset}>
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }>
              <BigAvatar src={avatar || undefined} $withBorder theme={theme} />
            </Badge>
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            <Button
              color='primary'
              aria-label='upload picture'
              component='label'
              {...otherProps}
              disabled={!!otherFieldProps.value}>
              <input
                hidden
                accept='image/*, image/heic, image/heif'
                type='file'
                onChange={handleChange}
                {...otherFieldProps}
              />
              <UploadIcon mr={2} />
              Upload
            </Button>
          </Box>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default FormAvatarUpload;
