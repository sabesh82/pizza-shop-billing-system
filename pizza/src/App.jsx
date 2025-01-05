import React, { useState } from "react";
import { FaPizzaSlice, FaPlus, FaTrash, FaReceipt } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  const [invoice, setInvoice] = useState([]);
  const [taxRate] = useState(0.05); 

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      setItems([...items, { ...newItem, id: items.length + 1 }]);
      setNewItem({ name: "", price: "", category: "" });
    }
  };

  const addToInvoice = (item) => {
    setInvoice([...invoice, item]);
  };

  const removeFromInvoice = (index) => {
    const updatedInvoice = invoice.filter((_, i) => i !== index);
    setInvoice(updatedInvoice);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    const subtotal = invoice.reduce((total, item) => total + parseFloat(item.price), 0);
    const tax = subtotal * taxRate;
    return { subtotal, tax, total: subtotal + tax };
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              
            }
           
            .invoice-details {
              margin-top: 20px;
            }
            .invoice-item {
              margin-bottom: 10px;
            }
            .contact{
              margin-top:300px;
            }
            .greeting{
            margin-top:25px;
            
            }
          </style>
        </head>
        <body>
          <h1>Pizza Shop</h1>
          <div class="invoice-details">
            <h3>Items:</h3>
            <div>
              ${invoice.map(item => `
                <div class="invoice-item">
                  ${item.name}  | (Category : ${item.category})
                </div>
              `).join('')}
            </div>
            <p>Subtotal: Rs ${calculateTotal().subtotal.toFixed(2)}</p>
            <p>Tax (10%): Rs ${calculateTotal().tax.toFixed(2)}</p>
            <h4>Total: Rs ${calculateTotal().total.toFixed(2)}</h4>
          </div>
          <div class="contact">
                <p>Address: Chilaw, Srilanka<br>
                Contact: +94 11 111 1111</p>
          </div>
          <div class="greeting">
          <p>Thank You!<br>
          Come again...</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="App">
      <header className="header">
        <h1><FaPizzaSlice /> Pizza-Shop Billing System</h1>
      </header>

      <main>
        <section className="items-section">
          <h2>Item Management</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <button onClick={addItem} className="add-btn">
              <FaPlus /> Add Item
            </button>
          </div>
          <div className="item-list">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h4>{item.name}</h4>
                <p>Rs {item.price} | {item.category}</p>
                <button onClick={() => addToInvoice(item)} className="invoice-btn">Add to Invoice</button>
                <button onClick={() => removeItem(item.id)} className="remove-btn">Delete</button>
              </div>
            ))}
          </div>
        </section>

        <section className="invoice-section">
          <h2>Invoice Management</h2>
          <div className="invoice-list">
            {invoice.map((item, index) => (
              <div key={index} className="invoice-item">
                <span>{item.name} - Rs {item.price}</span>
                <button onClick={() => removeFromInvoice(index)} className="remove-btn"><FaTrash /></button>
              </div>
            ))}
          </div>
          {invoice.length > 0 && (
            <div className="invoice-summary">
              <h3>Summary</h3>
              <div className="item-summary">
              {invoice.map((item, index) => (
              <p key={index}>
              {item.name} ({item.category}) </p>
          	))}
            </div>
              <p>Subtotal: Rs {calculateTotal().subtotal.toFixed(2)}</p>
              <p>Tax (5%): Rs {calculateTotal().tax.toFixed(2)}</p>
              <h4>Total: Rs {calculateTotal().total.toFixed(2)}</h4>
              <button className="print-btn" onClick={handlePrint}><FaReceipt /> Print Invoice</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
