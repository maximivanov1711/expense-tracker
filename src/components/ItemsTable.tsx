import { Item } from './ItemForm';

type Props = {
  items: Item[];
  onDelete: (desc: string) => void;
};

const ItemsTable = ({ items, onDelete }: Props) => {
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
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{items.map(ItemRow)}</tbody>
        <tfoot>
          <tr>
            <th>
              Total:{' '}
              {items.reduce((acc, item) => {
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
