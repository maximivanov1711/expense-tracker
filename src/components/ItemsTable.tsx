import { Item } from './ItemForm';
import styled from 'styled-components';
import { useState } from 'react';
import { ChangeEvent } from 'react';

type Props = {
  items: Item[];
  onDelete: (desc: string) => void;
};

const ItemsTable = ({ items, onDelete }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  let itemsToShow =
    selectedCategory === 'All categories'
      ? items
      : items.filter(item => item.category === selectedCategory);

  const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const SelectWrapper = styled.div`
    margin-bottom: 10px;
  `;

  const ItemRow = (item: Item) => {
    return (
      <tr key={item.desc}>
        <td>{item.desc}</td>
        <td>${item.amount}</td>
        <td>{item.category}</td>
        <td>
          <button
            className='btn btn-danger'
            onClick={() => onDelete(item.desc)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <SelectWrapper>
        <select
          className='form-select'
          value={selectedCategory}
          onChange={onChangeCategory}
        >
          <option value='All categories'>All categories</option>
          <option value='Not set'>Not set</option>
          <option value='Food'>Food</option>
          <option value='Other'>Other</option>
        </select>
      </SelectWrapper>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemsToShow.map(ItemRow)}</tbody>
        <tfoot>
          <tr>
            <th>
              Total: $
              {itemsToShow.reduce((acc, item) => {
                return acc + item.amount;
              }, 0)}
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
