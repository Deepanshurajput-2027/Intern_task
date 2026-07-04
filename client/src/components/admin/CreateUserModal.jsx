import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { adminService } from '../../services/admin.service';
import Modal from '../modal/Modal';
import Input from '../forms/Input';
import Button from '../ui/Button';

const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Minimum 8 characters'),
  role: z.enum(['ADMIN', 'STORE_OWNER', 'USER']),
  address: z.string().optional()
});

const CreateUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { role: 'USER' }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await adminService.createUser(data);
      toast.success('User created successfully');
      reset();
      onSuccess(); // refresh table and close
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose(); }} title="Create New User">
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Input label="Full Name" placeholder="John Doe" error={errors.name?.message} disabled={isSubmitting} {...register('name')} />
        <Input label="Email" type="email" placeholder="john@example.com" error={errors.email?.message} disabled={isSubmitting} {...register('email')} />
        <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} disabled={isSubmitting} {...register('password')} />
        
        <div className="input-group">
          <label className="input-label" htmlFor="role-select">Role</label>
          <select id="role-select" className="input-field" disabled={isSubmitting} {...register('role')}>
            <option value="USER">User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
          {errors.role && <p className="input-message error-message">{errors.role.message}</p>}
        </div>

        <Input label="Address (Optional)" placeholder="123 Main St" error={errors.address?.message} disabled={isSubmitting} {...register('address')} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-12)', marginTop: 'var(--spacing-16)' }}>
          <Button type="button" variant="ghost" onClick={() => { reset(); onClose(); }} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>Create User</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
