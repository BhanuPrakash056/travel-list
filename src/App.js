import {  useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
  { id: 4, description: "Toothbrush", quantity: 1, packed: true },
];
export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItem(newItem){
    setItems((items) => [...items, newItem]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo(){
  return <h1>🌴 Far Away</h1>;
}

function Form({ onAddItem }){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e){
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() }; 
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}> 
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
        </select>
        <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button>Add</button>
    </form>
  );
}

function PackingList({ items }){
  return (
    <div className="list">
    <ul >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
    </div>
  );
}

function Stats(){
  return (
    <footer className="stats">
      <em>💼 You have 0 items on your packing list, weighing 0 kg</em>
    </footer>
  );
}

function Item({ item }){
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      <input type="checkbox" />
      <span>{item.quantity} {item.description}</span>
      <button>❌</button>
</span>
    </li>
  );
}