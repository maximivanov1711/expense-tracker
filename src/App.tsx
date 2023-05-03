import { useState } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import { Item } from './components/ItemForm';
import ItemsTable from './components/ItemsTable';

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const onAdd = (item: Item) => {
    setItems([...items, item]);
    console.log(items);
  };

  return (
    <>
      <div className='container justify-content-center '>
        <h1 className='text-center'>Expense tracker</h1>
        <ItemForm onAdd={onAdd} />
        <ItemsTable />
      </div>
    </>
  );
}

export default App;
