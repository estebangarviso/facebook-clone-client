// https://react-hook-form.com/advanced-usage#FormProviderPerformance
import { useRef, useState, useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormHelperText, Modal, Alert } from '@mui/material';
import { useValidationResolver } from './../../custom-hook/useValidationResolver';
import { styled } from '@mui/material/styles';
import GlobalContext from '../../context';

const StyledForm = styled('form')``;

const Form = ({
  children,
  validationSchema,
  enterSubmit,
  onSuccess,
  serviceCallback,
  popUpError = false,
  defaultValues = {},
  ...otherProps
}) => {
  const { auth } = useContext(GlobalContext);
  const resolver = useValidationResolver(validationSchema);
  const formRef = useRef();
  const methods = useForm({ resolver, defaultValues });
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    setError(false);
    try {
      const formData = new FormData(formRef.current);
      const res = await serviceCallback(formData);
      if (onSuccess) {
        if (res.success || res.status === 200) {
          onSuccess(res);
        }
      }
      if (res.status >= 400) {
        // Logout user the server is down
        if (res.status === 503 && auth.currentUser) {
          auth.logout();
        }
        setError(res.data.message);
      }
      if (res.sucess || res.status === 200) {
        formRef?.current?.reset();
        methods.reset();
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter' && enterSubmit) {
      e.preventDefault();
      formRef?.current?.submit();
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledForm
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyPress={handleKeyPress}
        noValidate
        {...otherProps}>
        {children}
      </StyledForm>
      {popUpError ? (
        <Modal open={error} onClose={() => setError(false)} onBackdropClick={() => setError(false)}>
          <Alert severity='error'>{error}</Alert>
        </Modal>
      ) : (
        <FormHelperText error={error}>{error}</FormHelperText>
      )}
    </FormProvider>
  );
};

export default Form;
