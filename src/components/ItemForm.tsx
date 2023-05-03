import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  desc: z.string().nonempty({ message: 'Enter description' }),
  amount: z
    .number({ invalid_type_error: 'Amound must be more than 0' })
    .min(1, { message: 'Amound must be more than 0' }),
  category: z.enum(['Not set', 'Food', 'Other']),
});
type FormData = z.infer<typeof schema>;

const ItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isValid, errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

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

export default ItemForm;
