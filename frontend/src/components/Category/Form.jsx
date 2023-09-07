import React, { useState } from "react";
import { Divider, Grid, Box, Button, TextField, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

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
    <Card align="left">
      <CardContent>
        <form onSubmit={(event) => event.preventDefault()}>

          <TextField
            onChange={(event) => setName(event.target.value)}
            value={name}
            label="Category Name"
            sx={{ mb: 2 }
            }
          />
          <Divider variant="middle"/>
          {!!presets.length && (
            <Typography component="h2" variant="h4" sx={{ py: 2 }}>Presets</Typography>
          )}

          <Grid container spacing={2}>
            {presets.map((preset) => (
              <Grid item xs='auto' key={preset.name}>
                <Button value={preset.name} disabled variant="contained">
                  {preset.name}
                </Button>
              </Grid>
            ))}
            {!!presets.length && (
              <Grid item xs='auto'>
                <Button onClick={() => { clearPresetSelection(); transition(CREATE_PRESET) }} variant="contained" disabled startIcon={<AddIcon />}>
                  New
                </Button>
              </Grid>
            )}
          </Grid>

          <Typography component="h2" variant="h4" sx={{ py: 2 }}>Fields</Typography>

          <List>
            {fields.map((field, i) => (
              <ListItem key={i}>
                <TextField
                  onChange={(event) => handleFieldChange(i, event)}
                  label="Field Name"
                  defaultValue={field}
                />

                <Button variant="outlined" onClick={() => handleFieldRemove(i)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}

            <ListItem>
              <Button variant="outlined" onClick={() => setFields([...fields, ""])} startIcon={<AddIcon />}>
                Add Field
              </Button>
            </ListItem>
          </List>

          <Typography variant="body1" gutterBottom>
            {error}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              mt: 2,
            }}
          >
            <Button variant="outlined" onClick={onCancel} sx={{ mr: 2 }} >Cancel</Button>
            <Button variant="contained" onClick={validate} startIcon={<SaveIcon />}>Save</Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
