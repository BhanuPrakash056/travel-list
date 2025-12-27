export default function Stats({item}){

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