import React, { useState } from 'react';
import useVisualMode from "../../../hooks/useVisualMode";

const SHOW = "SHOW";
const PRESET_SELECTED = "PRESET_SELECTED";
const EDIT_PRESET = "EDIT_PRESET";
const CREATE_PRESET = "CREATE_PRESET";

export default function Show({ category, onEdit, onDelete, onSave }) {
  const { mode, transition, back } = useVisualMode(SHOW);

  const [selectedPreset, setSelectedPreset] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [newPresetName, setNewPresetName] = useState('');

  const handlePresetClick = (preset) => {
    // unselect preset if already selected
    if (selectedPreset === preset.name) {
      setFieldValues({});
      setSelectedPreset(null);
      transition(SHOW);
      return;
    }

    setFieldValues(preset.values);
    setSelectedPreset(preset.name);

    transition(PRESET_SELECTED);
  };

  const deletePreset = () => {
    const newPresets = category.presets.filter(preset => preset.name !== selectedPreset);

    onSave(newPresets);
  }

  const savePreset = () => {
    const newPresets = category.presets.map(preset => {
      if (preset.name === selectedPreset) {
        return {
          name: preset.name,
          values: fieldValues,
        };
      }
    
      return preset;
    });

    onSave(newPresets);
  }

  const saveNewPreset = () => {
    const newPresets = [
      ...category.presets,
      {
        name: newPresetName,
        values: fieldValues,
      }
    ];

    onSave(newPresets);
    setNewPresetName('');
  }

  const handleInputChange = (fieldName, event) => {
    setFieldValues({
      ...fieldValues,
      [fieldName]: event.target.value
    });
  };

  return (
    <div>
      <h1>{category.name}</h1>
      <h2>Presets</h2>
      <ul>
        <>
        
        {category.presets?.map((preset) => (
          <li key={preset.name}>
            <button onClick={() => handlePresetClick(preset)}>
              {preset.name} {selectedPreset === preset.name && '(selected)'}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => transition(CREATE_PRESET)}>Add preset</button>
        </li>
        </>
      </ul>
      <h2>Fields</h2>
      {mode === SHOW && (
        <ul>
          {category.fields?.map((field) => (
            <li key={field}>
              <p>{field}</p>
            </li>
          ))}
        </ul>
      )}
      {mode === PRESET_SELECTED && (
        <>
          {category.fields?.map((field, i) => (
            <div key={i}>
              <label>{field}</label>
              <input disabled type="text" value={fieldValues[field] || ''} onChange={(e) => handleInputChange(field, e)} />
            </div>
          ))}
          <div>
            <button onClick={() => transition(EDIT_PRESET)}>Edit preset</button>
            <button onClick={() => deletePreset()}>Delete preset</button>
          </div>
        </>
      )}
      {mode === EDIT_PRESET && (
        <>
          {category.fields?.map((field, i) => (
            <div key={i}>
              <label>{field}</label>
              <input type="text" value={fieldValues[field] || ''} onChange={(e) => handleInputChange(field, e)} />
            </div>
          ))}
          <div>
            <button onClick={() => back()}>Cancel</button>
            <button onClick={() => savePreset()}>Save preset</button>
            <button onClick={() => deletePreset()}>Delete preset</button>
          </div>
        </>
      )}
      {mode === CREATE_PRESET && (
        <>
          <div>
            <label>Name</label>
            <input type="text" value={newPresetName} onChange={(e) => setNewPresetName(e.target.value)} />
          </div>
          {category.fields?.map((field, i) => (
            <div key={i}>
              <label>{field}</label>
              <input type="text" value={fieldValues[field] || ''} onChange={(e) => handleInputChange(field, e)} />
            </div>
          ))}
          <div>
            <button onClick={() => back()}>Cancel</button>
            <button onClick={() => saveNewPreset()}>Save preset</button>
          </div>
        </>
      )}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}
