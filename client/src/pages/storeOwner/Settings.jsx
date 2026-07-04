import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ownerService } from '../../services/owner.service';
import AuthCard from '../../components/common/AuthCard';
import Input from '../../components/forms/Input';
import Button from '../../components/ui/Button';
import { Lock } from 'lucide-react';
import '../../pages/user/UserSettings.css'; // Reuse shake animation CSS

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[\W_]/, 'Must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const currentPasswordRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const { ref: currentPasswordHookRef, ...currentPasswordProps } = register('currentPassword');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await ownerService.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success('Password updated successfully');
      reset();
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setError('currentPassword', { type: 'manual', message: 'Incorrect current password' });
        setTimeout(() => {
          if (currentPasswordRef.current) currentPasswordRef.current.focus();
        }, 50);
      } else {
        toast.error('Failed to update password');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ alignItems: 'center', paddingTop: 'var(--spacing-48)' }}>
      <AuthCard title="Store Owner Settings" subtitle="Update your password to keep your store account secure.">
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
          <div className={shake ? 'shake-animation' : ''}>
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.currentPassword?.message}
              disabled={isSubmitting}
              {...currentPasswordProps}
              ref={(e) => {
                currentPasswordHookRef(e);
                currentPasswordRef.current = e;
              }}
            />
          </div>
          
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            error={errors.newPassword?.message}
            disabled={isSubmitting}
            {...register('newPassword')}
          />
          
          <Input
            label="Confirm New Password"
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
            style={{ marginTop: 'var(--spacing-8)' }}
          >
            Update Password
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default Settings;
