import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import FormField from '../components/FormField/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../layouts/AuthLayout/AuthLayout.jsx';
import { getApiErrorMessage } from '../utils/getApiErrorMessage.js';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/chat';

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
      await login(formData);
      navigate(from, { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your workspace"
      // subtitle="Continue your conversations with a secure JWT-powered session."
      subtitle={"Continue your conversations with Jublee chat app"}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error ? <div className="auth-alert">{error}</div> : null}
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
          placeholder="Your password"
          type="password"
          value={formData.password}
          required
        />
        <Button isLoading={isSubmitting} type="submit">
          Sign in
        </Button>
      </form>
      <p className="auth-switch">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
