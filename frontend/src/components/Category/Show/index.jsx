import React, { useState } from 'react';
import useVisualMode from "../../../hooks/useVisualMode";

const SHOW = "SHOW";
const PRESET_SELECTED = "PRESET_SELECTED";
const EDIT_PRESET = "EDIT_PRESET";
const CREATE_PRESET = "CREATE_PRESET";

import { Typography, Card, CardContent, Button, List, ListItem, TextField, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';

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
    <Card>
      <CardContent>
        <Typography component="h1" variant="h2">{category.name}</Typography>
        <Typography component="h2" variant="h4">Presets</Typography>
        <Grid container spacing={2}>
          <ToggleButtonGroup
            value={selectedPreset}
            onChange={(event, newPreset) => handlePresetClick(newPreset)} // TODO: this hsould probably be the one, not the one below
            exclusive
          >
            {category.presets?.map((preset) => (
              <Grid item xs={8} key={preset.name} sx={{m: 2,}}>
                <ToggleButton value={preset.name} onClick={() => handlePresetClick(preset)}>
                  {preset.name}  {selectedPreset === preset.name && '(selected)'}
                </ToggleButton>
              </Grid>
            ))}
          </ToggleButtonGroup>
          <Grid item xs='auto'>
            <Button onClick={() => transition(CREATE_PRESET)} variant="outlined">
              + Add preset
            </Button>
          </Grid>
        </Grid>
        <h2>Fields</h2>
        {mode === 'SHOW' && (
          <List>
            {category.fields?.map((field) => (
              <ListItem key={field}>
                <p>{field}</p>
              </ListItem>
            ))}
          </List>
        )}
        {mode === 'PRESET_SELECTED' && (
          <>
            {category.fields?.map((field, i) => (
              <TextField
                key={i}
                label={field}
                value={fieldValues[field] || ''}
                disabled
                onChange={(e) => handleInputChange(field, e)}
              />
            ))}
            <div>
              <Button variant="outlined" onClick={() => transition('EDIT_PRESET')}>Edit preset</Button>
              <Button variant="contained" onClick={() => deletePreset()}>Delete preset</Button>
            </div>
          </>
        )}

        {mode === 'EDIT_PRESET' && (
          <>
            {category.fields?.map((field, i) => (
              <TextField
                key={i}
                label={field}
                value={fieldValues[field] || ''}
                onChange={(e) => handleInputChange(field, e)}
              />
            ))}
            <div>
              <Button variant="outlined" onClick={() => back()}>Cancel</Button>
              <Button variant="outlined" onClick={() => savePreset()}>Save preset</Button>
              <Button variant="contained" onClick={() => deletePreset()}>Delete preset</Button>
            </div>
          </>
        )}

        {mode === 'CREATE_PRESET' && (
          <>
            <TextField
              label="Name"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
            />
            {category.fields?.map((field, i) => (
              <TextField
                key={i}
                label={field}
                value={fieldValues[field] || ''}
                onChange={(e) => handleInputChange(field, e)}
              />
            ))}
            <div>
              <Button variant="outlined" onClick={() => back()}>Cancel</Button>
              <Button variant="contained" onClick={() => saveNewPreset()}>Save preset</Button>
            </div>
          </>
        )}
        <Button variant="outlined" onClick={onEdit}>Edit</Button>
        <Button variant="contained" onClick={onDelete}>Delete</Button>
      </CardContent>
    </Card>
  )
}
