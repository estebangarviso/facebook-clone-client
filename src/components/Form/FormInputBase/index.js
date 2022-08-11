import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputBase, Modal, Alert } from '@mui/material';

const FormInputBase = ({ name, ...otherProps }) => {
  const { control } = useFormContext();
  const handleRender = ({ field, fieldState: { error } }) => {
    return (
      <>
        <InputBase error={!!error} {...field} {...otherProps} />
        <Modal open={error}>
          <Alert severity='error'>{error ? error.message : ''}</Alert>
        </Modal>
      </>
    );
  };
  return <Controller render={handleRender} name={name} control={control} />;
};
export default FormInputBase;
