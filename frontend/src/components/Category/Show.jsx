export default function Show({category, onEdit, onDelete}) {

  return (
    <div>
      <h1>{category.name}</h1>
      <h2>Presets</h2>
      <ul>
        {category.presets?.map((preset) => (
          <li key={preset.name}>
            <button onClick={() => {}}>
              {preset.name}
            </button>
          </li>
        ))}
      </ul>
      <h2>Fields</h2>
      <ul>
        {category.fields?.map((field) => (
          <li key={field}>
            <p>{field}</p>
          </li>
        ))}
      </ul>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}
