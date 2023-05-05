import { useState } from 'react';
import { Item } from './components/ItemForm';
import ItemForm from './components/ItemForm';
import ItemsTable from './components/ItemsTable';
import './App.css';

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const onAdd = (item: Item) => {
    setItems([...items, item]);
  };

  const onDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <>
      <div className='container justify-content-center '>
        <h1 className='text-center'>Expense tracker</h1>
        <div className='mb-3'>
          <ItemForm onAdd={onAdd} />
        </div>
        <ItemsTable items={items} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
