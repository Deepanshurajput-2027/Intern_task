import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import AuthCard from '../../components/common/AuthCard';
import Input from '../../components/forms/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import './AuthPages.css';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated() && user) {
      if (user.role === 'ADMIN') navigate('/admin/dashboard', { replace: true });
      else if (user.role === 'STORE_OWNER') navigate('/store-owner/dashboard', { replace: true });
      else navigate('/user/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await authService.login(data);
      login(response.token);
      toast.success('Successfully logged in');
      // Navigation is handled by the useEffect above once user state updates
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 404) {
        toast.error('Invalid email or password');
      } else if (!error.response) {
        toast.error('Unable to connect to server');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Please enter your details to sign in.">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          error={errors.email?.message}
          disabled={isSubmitting}
          autoFocus
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password')}
        />
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          className="w-full mt-4"
        >
          Sign In
        </Button>
      </form>
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </AuthCard>
  );
};

export default Login;
