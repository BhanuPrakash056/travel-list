import {  useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
//   { id: 4, description: "Toothbrush", quantity: 1, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(newItem){
    setItems((items) => [...items, newItem]);
  }
  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleTogglePacked(id){
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onTogglePacked={handleTogglePacked} />
      <Stats item={items} />
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

function PackingList({ items, onDeleteItem, onTogglePacked }){
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = [...items];
  if(sortBy === "input") sortedItems = items;
  if(sortBy === "description") sortedItems.slice().sort((a, b) => a.description.localeCompare(b.description));
  if(sortBy === "packed") sortedItems.slice().sort((a, b) => Number(a.packed) - Number(b.packed)); 
  return (
    <div className="list">
    <ul >
      {sortedItems.map((item) => (
        <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onTogglePacked={onTogglePacked} />
      ))}
    </ul>
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Input order</option>
        <option value="description">Description</option>
        <option value="packed">Packed status</option>
      </select>
    </div>
    </div>
  );
}

function Stats({item}){

  if(item.length === 0) return <footer className="stats"><em>Your packing list is empty. Start adding items!</em></footer>;
  const itemCount = item.length;
  const itemPacked = item.filter((item) => item.packed).length;
  const percentage = itemCount === 0 ? 0 : Math.round((itemPacked / itemCount) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "🎉 You are ready to go! 🎉" :
        `💼 You have ${itemCount} items on your packing list, and you have packed ${itemPacked} (${percentage}%) of them.`}</em>
    </footer>
  );
}

function Item({ item, onDeleteItem, onTogglePacked }){
  
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onTogglePacked(item.id)} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      <span>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
</span>
    </li>
  );
}