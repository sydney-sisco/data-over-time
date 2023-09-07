import React, { useState } from "react";
import { Button, TextField, List, ListItem, Typography, Card, CardContent } from '@mui/material';

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
    <Card>
      <CardContent>
    <form onSubmit={(event) => event.preventDefault()}>

      <TextField
        onChange={(event) => setName(event.target.value)}
        value={name}
        label="Category Name"
      />

      {!!presets.length && (
      <Typography variant="h6" gutterBottom component="div">
        Presets
      </Typography>
      )}

      <List>
        {presets.map((preset) => (
          <ListItem key={preset.name}>
            <Button variant="outlined" disabled>
              {preset.name}
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom component="div">
        Fields
      </Typography>

      <List>
        {fields.map((field, i) => (
          <ListItem key={i}>
            <TextField
              onChange={(event) => handleFieldChange(i, event)}
              value={field} />

            <Button variant="contained" color="error" onClick={() => handleFieldRemove(i)}>
              Delete
            </Button>
          </ListItem>
        ))}

        <ListItem>
          <Button variant="outlined" onClick={() => setFields([...fields, ""])}>
            Add Field
          </Button>
        </ListItem>
      </List>

      <Button variant="contained" onClick={validate}>
        Save
      </Button>

      <Typography variant="body1" gutterBottom>
        {error}
      </Typography>

      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>

    </form>
    </CardContent>
    </Card>
  );
}
