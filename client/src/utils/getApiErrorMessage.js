export const getApiErrorMessage = (error) => {
  const errors = error.response?.data?.errors;

  if (Array.isArray(errors) && errors.length > 0) {
    return errors[0].message;
  }

  return error.response?.data?.message || 'Something went wrong. Please try again.';
};
