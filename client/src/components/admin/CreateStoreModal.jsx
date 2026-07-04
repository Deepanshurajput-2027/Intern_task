import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { adminService } from '../../services/admin.service';
import Modal from '../modal/Modal';
import Input from '../forms/Input';
import Button from '../ui/Button';

const storeSchema = z.object({
  name: z.string().min(2, 'Store name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  ownerId: z.string().min(1, 'Store Owner is required')
});

const CreateStoreModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [owners, setOwners] = useState([]);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(storeSchema)
  });

  useEffect(() => {
    if (isOpen) {
      adminService.getUsers({ role: 'STORE_OWNER', limit: 100 })
        .then(res => setOwners(res.users || []))
        .catch(err => console.error('Failed to load owners', err));
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = { ...data, ownerId: parseInt(data.ownerId) };
      await adminService.createStore(payload);
      toast.success('Store created successfully');
      reset();
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose(); }} title="Create New Store">
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Input label="Store Name" placeholder="My Awesome Store" error={errors.name?.message} disabled={isSubmitting} {...register('name')} />
        <Input label="Store Email" type="email" placeholder="store@example.com" error={errors.email?.message} disabled={isSubmitting} {...register('email')} />
        <Input label="Address" placeholder="123 Store St" error={errors.address?.message} disabled={isSubmitting} {...register('address')} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text)' }}>Store Owner</label>
          <select 
            className="input-field" 
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
            disabled={isSubmitting} 
            {...register('ownerId')}
          >
            <option value="">Select an owner...</option>
            {owners.map(owner => (
              <option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>
            ))}
          </select>
          {errors.ownerId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.ownerId.message}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-12)', marginTop: 'var(--spacing-16)' }}>
          <Button type="button" variant="ghost" onClick={() => { reset(); onClose(); }} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>Create Store</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateStoreModal;
