'use client'

import React, { useEffect, useState } from 'react'

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [products,setProducts] = useState<string[]>([]);
  const [selectedProducts,setSelectedProducts] = useState<string[]>([]);

  function addProduct(product: string | undefined) {
    if(!product || products.includes(product)) return;
    setProducts([...products, product || '']);
    setInputValue('');
    localStorage.setItem("products",JSON.stringify([...products,product]));
  }

  function handleCheckboxChange(product: string) {
    if(selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter(p => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  function deleteSelected(productsToBeDeleted: string[]) {
    setProducts(products.filter((product => !productsToBeDeleted.includes(product))));
    localStorage.setItem("products",JSON.stringify(products.filter((product => !productsToBeDeleted.includes(product)))));
  }


  useEffect(() => {
    if(localStorage.getItem("products") === null) return;
    const storedProducts = JSON.parse(localStorage.getItem("products") || '');
    if(storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  return (
    <div className='flex-column m-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
      </div>
      <div className='flex'>
        <label htmlFor='todoInput'></label>
        <input 
          className='border p-2' 
          id='todoInput' 
          type='text' 
          value={inputValue} 
          placeholder='Add a new todo'
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button className='cursor-pointer border rounded hover:bg-gray-200 p-2 ml-4' onClick={() => addProduct((document.getElementById('todoInput') as HTMLInputElement).value)}>Add</button>
        <button className='cursor-pointer bg-red-500 text-white rounded p-2 ml-4' onClick={() =>deleteSelected(selectedProducts)}>Delete selected</button>
      </div>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <input 
              type='checkbox' 
              value={product}
              onChange={()=> handleCheckboxChange(product)}/>
            {product}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList