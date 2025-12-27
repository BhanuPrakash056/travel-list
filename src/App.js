import {  useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import { Stats } from "./Stats";

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
  function handleClearList(){
    const confirm = window.confirm("Are you sure you want to clear the list?");
    if(!confirm) return;
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onTogglePacked={handleTogglePacked} onClearList={handleClearList} />
      <Stats item={items} />
    </div>
  );
}