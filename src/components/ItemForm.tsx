import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import categories from '../categories';
import { v4 as uuidv4 } from 'uuid';

type Item = {
  id: string;
  desc: string;
  amount: number;
  category: string;
};

type Props = {
  onAdd: (item: Item) => void;
};

const schema = z.object({
  desc: z.string().nonempty({ message: 'Enter description' }),
  amount: z
    .number({ invalid_type_error: 'Amount must be more than 0' })
    .min(1, { message: 'Amount must be more than 0' }),
  category: z.enum(categories),
});
type FormData = z.infer<typeof schema>;

const ItemForm = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (item: FormData) => {
    onAdd({
      id: uuidv4(),
      ...item,
    });
    reset();
  };

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
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button className='btn btn-primary' type='submit'>
        Add
      </button>
    </form>
  );
};

export type { Item, FormData };
export default ItemForm;
