import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Item = {
  desc: string;
  amount: number;
  category: 'Not set' | 'Food' | 'Other';
};

type Props = {
  items: Item[];
  onAdd: (item: Item) => void;
};

const createSchema = (items: Item[]) =>
  z.object({
    desc: z
      .string()
      .nonempty({ message: 'Enter description' })
      .refine(desc => !items.some(item => item.desc === desc), {
        message: 'This item already exists',
      }),
    amount: z
      .number({ invalid_type_error: 'Amount must be more than 0' })
      .min(1, { message: 'Amount must be more than 0' }),
    category: z.enum(['Not set', 'Food', 'Other']),
  });

const ItemForm = ({ items, onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isValid, errors },
  } = useForm<Item>({
    resolver: zodResolver(createSchema(items)),
  });

  const onSubmit = (item: Item) => onAdd(item);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add item</h3>
      <div className='mb-3'>
        <label className='form-label' htmlFor='desc'>
          Description
        </label>
        <input
          {...register('desc')}
          className='form-control'
          type='text'
          name='desc'
          id='desc'
        />
        {errors.desc && <p className='text-danger'>{errors.desc.message}</p>}
      </div>
      <div className='mb-3'>
        <label className='form-label' htmlFor='amount'>
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          className='form-control'
          type='number'
          name='amount'
          id='amount'
        />
        {errors.amount && (
          <p className='text-danger'>{errors.amount.message}</p>
        )}
      </div>
      <div className='mb-3'>
        <label className='form-label' htmlFor='category'>
          Categoty
        </label>
        <select
          {...register('category')}
          className='form-select'
          defaultValue='Not set'
        >
          <option value='Not set'>Not set</option>
          <option value='Food'>Food</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <button
        className='btn btn-primary'
        type='submit'
        disabled={isSubmitted && !isValid}
      >
        Add
      </button>
    </form>
  );
};

export type { Item };
export default ItemForm;
