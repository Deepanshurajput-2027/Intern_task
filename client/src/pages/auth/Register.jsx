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
import { User, Mail, Lock } from 'lucide-react';
import './AuthPages.css';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[\W_]/, 'Must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
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
      // Role is hardcoded to USER on the backend for public registration, 
      // but we omit it here entirely to prevent spoofing.
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password
      };
      
      await authService.register(payload);
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      const status = error.response?.status;
      if (status === 409) {
        toast.error('Email is already in use');
      } else if (!error.response) {
        toast.error('Unable to connect to server');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="Create an account" subtitle="Join RateIt today.">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          error={errors.name?.message}
          disabled={isSubmitting}
          autoFocus
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          error={errors.email?.message}
          disabled={isSubmitting}
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
          {...register('confirmPassword')}
        />
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          className="w-full mt-4"
        >
          Sign Up
        </Button>
      </form>
      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </AuthCard>
  );
};

export default Register;
