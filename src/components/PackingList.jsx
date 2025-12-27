import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onTogglePacked, onClearList }){
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
      <button onClick={() => onClearList()}>Clear sort</button>
    </div>
    </div>
  );
}