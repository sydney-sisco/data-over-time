import React, { useState } from "react";

export default function Form({ category, onSave, onCancel }) {
  const [name, setName] = useState(category?.name || "");
  const [presets, setPresets] = useState(category?.presets || []);
  const [fields, setFields] = useState(category?.fields || []);
  const [error, setError] = useState("");

  function handleFieldChange(i, event) {
    const newFields = [...fields];
    newFields[i] = event.target.value;
    setFields(newFields);
  }

  function handleFieldRemove(i) {
    const newFields = [...fields];
    newFields.splice(i, 1);
    setFields(newFields);
  }

  function validate() {
    if (name === "") {
      setError("Name cannot be blank");
      return;
    }

    setError("");

    const category = {
      name,
      presets,
      fields,
    };

    onSave(category);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input onChange={(event) => setName(event.target.value)} value={name} />
      <h2>Presets</h2>
      <ul>
        {presets.map((preset) => (
          <li key={preset.name}>
            <button onClick={() => {}}>
              {preset.name}
            </button>
          </li>
        ))}
      </ul>
      <h2>Fields</h2>
      <ul>
        {fields.map((field, i) => (
          <li key={i}>
            <input onChange={(event) => handleFieldChange(i, event)} value={field} />
            <button onClick={() => handleFieldRemove(i)}>Delete</button>
          </li>
        ))}
        <li>
          <button onClick={() => setFields([...fields, ""])}>Add Field</button>
        </li>
      </ul>
      <button onClick={validate}>Save</button>
      <p>{error}</p>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
}
