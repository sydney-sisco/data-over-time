import React, { useState } from 'react';
import useVisualMode from "../../../hooks/useVisualMode";

const SHOW = "SHOW";
const PRESET_SELECTED = "PRESET_SELECTED";
const EDIT_PRESET = "EDIT_PRESET";
const CREATE_PRESET = "CREATE_PRESET";

import { Typography, Card, CardContent, Button, List, ListItem, TextField, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';

export default function Show({ category, onEdit, onDelete, onSave }) {
  const { mode, transition, back } = useVisualMode(SHOW);

  const [selectedPreset, setSelectedPreset] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [newPresetName, setNewPresetName] = useState('');

  const clearPresetSelection = () => {
    setSelectedPreset(null);
    setFieldValues({});
  }

  const handlePresetClick = (preset) => {
    // unselect preset if already selected
    if (selectedPreset === preset.name) {
      clearPresetSelection();
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
    <Card align="left">
      <CardContent>
        <Typography align="center" component="h1" variant="h2">{category.name}</Typography>
        <Divider variant="middle"/>
        <Typography component="h2" variant="h4" sx={{py:2}}>Presets</Typography>
        <Grid container spacing={2}>
          {category.presets?.map((preset) => (
            <Grid item xs='auto' key={preset.name}>
              <Button value={preset.name} onClick={() => handlePresetClick(preset)} variant={selectedPreset === preset.name ? "outlined" : "contained"} >
                {preset.name}
              </Button>
            </Grid>
          ))}
          <Grid item xs='auto'>
            <Button onClick={() => { clearPresetSelection(); transition(CREATE_PRESET) }} variant="contained" color="secondary" startIcon={<AddIcon/>}>
              New
            </Button>
          </Grid>
        </Grid>
        <Typography component="h2" variant="h4" sx={{py:2}}>Fields</Typography>
        {mode === SHOW && (
          <List>
            {category.fields?.map((field) => (
              <ListItem key={field}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  id="outlined-disabled"
                  label="Field Name"
                  defaultValue={field}
                />
              </ListItem>
            ))}
          </List>
        )}
        {mode === PRESET_SELECTED && (
          <List>
            {category.fields?.map((field, i) => (
              <ListItem key={field}>
                <TextField
                  key={i}
                  label={field}
                  value={fieldValues[field] || ' '}
                  disabled
                  onChange={(e) => handleInputChange(field, e)}
                />
              </ListItem>
            ))}
            <ListItem>
              <Button variant="outlined" onClick={() => transition(EDIT_PRESET)} sx={{mr:2}} startIcon={<EditIcon />}>Edit preset</Button>
              <Button variant="outlined" onClick={() => deletePreset()} startIcon={<DeleteIcon />}>Delete</Button>
            </ListItem>
          </List>
        )}

        {mode === EDIT_PRESET && (
          <List>
            {category.fields?.map((field, i) => (
              <ListItem key={field}>
                <TextField
                  key={i}
                  label={field}
                  value={fieldValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </ListItem>
            ))}
            <ListItem>
              {/* <Button variant="contained" color="error" onClick={() => back()}>Cancel</Button> */}
              <Button variant="outlined" onClick={() => back()} sx={{mr:2}}>Cancel</Button>
              <Button variant="contained" onClick={() => savePreset()} startIcon={<SaveIcon />}>Save preset</Button>
            </ListItem>
          </List>
        )}

        {mode === CREATE_PRESET && (
          <List>
            <ListItem>
            <TextField
              label="Preset Name"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
            />
            </ListItem>
            <Divider>Fields</Divider>
            {category.fields?.map((field, i) => (
              <ListItem key={field}>
                <TextField
                  key={i}
                  label={field}
                  value={fieldValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e)}
                />
              </ListItem>
            ))}
            <ListItem>
              <Button variant="outlined" onClick={() => back()}>Cancel</Button>
              <Button variant="contained" onClick={() => saveNewPreset()}>Save preset</Button>
            </ListItem>
          </List>
        )}
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onEdit} sx={{mr:2}} startIcon={<EditIcon />}>Edit</Button>
          <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
