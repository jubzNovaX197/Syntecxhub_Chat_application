import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import FormField from '../components/FormField/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../layouts/AuthLayout/AuthLayout.jsx';
import { getApiErrorMessage } from '../utils/getApiErrorMessage.js';
import './AuthPages.css';

const initialFormData = {
  name: '',
  username: '',
  email: '',
  password: ''
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate('/chat', { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Start chatting in Second"
      subtitle="Register once, then keep your private conversations synced and ready."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error ? <div className="auth-alert">{error}</div> : null}
        <FormField
          id="name"
          label="Name"
          name="name"
          onChange={handleChange}
          placeholder="Your full name"
          value={formData.name}
          required
        />
        <FormField
          id="username"
          label="Username"
          name="username"
          onChange={handleChange}
          placeholder="Sort user name"
          value={formData.username}
          required
        />
        <FormField
          id="email"
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="name@example.com"
          type="email"
          value={formData.email}
          required
        />
        <FormField
          id="password"
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="At least 8 chars, 1 uppercase, 1 number"
          type="password"
          value={formData.password}
          required
        />
        <Button isLoading={isSubmitting} type="submit">
          Create account
        </Button>
      </form>
      <p className="auth-switch">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
