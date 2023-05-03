import { useState } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemsTable from './components/ItemsTable';

function App() {
  const [items, setItems] = useState([]);

  return (
    <>
      <div className='container justify-content-center '>
        <h1 className='text-center'>Expense tracker</h1>
        <ItemForm />
        <ItemsTable />
      </div>
    </>
  );
}

export default App;
