
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo(){
  return <h1>🌴 Far Away</h1>;
}

function Form(){
  return (
    <form className="add-form">
      <h3>what do you need for your trip?</h3>
      <select>  
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
        </select>
        <input type="text" placeholder="Item..." />
        <button>Add</button>
    </form>
  );
}

function PackingList(){
  return (
    <div className="list">
    <ul >
      {initialItems.map((item) => (
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