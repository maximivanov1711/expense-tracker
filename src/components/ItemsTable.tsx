import { Item } from './ItemForm';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import categories from '../categories';

type Props = {
  items: Item[];
  onDelete: (desc: string) => void;
};

const ItemsTable = ({ items, onDelete }: Props) => {
  if (items.length === 0) return null;

  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const itemsToShow =
    selectedCategory === 'All categories'
      ? items
      : items.filter(item => item.category === selectedCategory);

  return (
    <>
      <div className='mb-2'>
        <select
          className='form-select'
          value={selectedCategory}
          onChange={onChangeCategory}
        >
          <option value='All categories'>All categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemsToShow.map(item => (
            <tr key={item.id}>
              <td>{item.desc}</td>
              <td>${item.amount}</td>
              <td>{item.category}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              Total: ${itemsToShow.reduce((acc, item) => acc + item.amount, 0)}
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ItemsTable;
