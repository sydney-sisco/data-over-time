export default function Empty({ onAdd }) {
  return (
    <div>
      <p>Click to add a new Category.</p>
      <button onClick={onAdd}>Add</button>
    </div>
  );
}
