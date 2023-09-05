export default function Error({ message, onClose }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
