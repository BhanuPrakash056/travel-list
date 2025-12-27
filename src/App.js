import {  useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";

// export default function App() {
//   const [items, setItems] = useState([]);
//   function handleAddItem(newItem){
//     setItems((items) => [...items, newItem]);
//   }
//   function handleDeleteItem(id){
//     setItems((items) => items.filter((item) => item.id !== id));
//   }
//   function handleTogglePacked(id){
//     setItems((items) =>
//       items.map((item) =>
//         item.id === id ? { ...item, packed: !item.packed } : item
//       )
//     );
//   }
//   function handleClearList(){
//     const confirm = window.confirm("Are you sure you want to clear the list?");
//     if(!confirm) return;
//     setItems([]);
//   }
//   return (
//     <div className="app">
//       <Logo />
//       <Form onAddItem={handleAddItem} />
//       <PackingList items={items} onDeleteItem={handleDeleteItem} onTogglePacked={handleTogglePacked} onClearList={handleClearList} />
//       <Stats item={items} />
//     </div>
//   );
// }

export default function App(){
  const [tip, setTip] = useState("");
  const [satisfaction1, setSatisfaction1] = useState(0);
  const [satisfaction2, setSatisfaction2] = useState(0);
  function handleSetTip(tip){
    setTip(tip);
  }

  const averageSatisfaction = (satisfaction1 + satisfaction2) / 2;



  return (
    <>
    <InputTip tip={tip} onSetTip={handleSetTip} />
    <SelectSatisfaction value={satisfaction1} onChange={setSatisfaction1} />
    <SelectSatisfaction value={satisfaction2} onChange={setSatisfaction2} />
    <TipCalculator tip={tip} satisfaction={averageSatisfaction} />
    </>
  )
}

function InputTip({ tip, onSetTip }){
  return <div><span>Input Tip Component</span>
  <input type="text" placeholder="Type here..." value={tip} onChange={(e) => onSetTip(e.target.value)} />
  </div>;
}

function SelectSatisfaction({ value, onChange }){
  return <div><span>select the satisfaction</span>
  <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
    <option value={20}>Very Satisfied 20%</option>
    <option value={10}>Satisfied 10%</option>
    <option value={5}>Neutral 5%</option>
    <option value={0}>Dissatisfied 0%</option>
  </select>
  </div>;
}

function TipCalculator({ tip, satisfaction }){
  const tipNum = parseFloat(tip);
  const satisfactionNum = parseFloat(satisfaction);
  const validTip = isNaN(tipNum) ? 0 : tipNum;
  const validSatisfaction = isNaN(satisfactionNum) ? 0 : satisfactionNum;
  const tipAmount = validTip * (validSatisfaction / 100);
  return <div>
    <h2>Tip Calculator</h2>
    <p>Tip: ${validTip}</p>
    <p>Satisfaction: {validSatisfaction}%</p>
    <p>Calculated Tip Amount: ${tipAmount.toFixed(2)}</p>
  </div>;
}