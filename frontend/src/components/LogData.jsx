import React, { useState } from 'react';
import { Link } from 'wouter';
import { Box, Grid, Button, TextField, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const LogData = ({ categories, submitData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [fieldValues, setFieldValues] = useState({});

  const clearCategorySelection = () => {
    setSelectedCategory(null);
    setSelectedPreset(null);
    setFieldValues({});
  }

  const handleCategoryClick = (categoryIndex) => {

    setSelectedPreset(null);
    if (selectedCategory === categories[categoryIndex]) {
      clearCategorySelection();
      return;
    }
    setSelectedCategory(categories[categoryIndex]);
    setFieldValues({});
  };

  const handlePresetClick = (preset) => {
    if (selectedPreset === preset) {
      setSelectedPreset(null);
      setFieldValues({});
      return;
    }
    setSelectedPreset(preset);
    setFieldValues(preset.values);
    // setFieldValues(presetValues);
  };

  const handleInputChange = (fieldName, event) => {
    setFieldValues({
      ...fieldValues,
      [fieldName]: event.target.value
    });
  };

  const postData = async () => {
    const data = {
      category: selectedCategory.name,
      values: fieldValues,
    };

    console.log('posting: ', data);

    submitData(data);

    setFieldValues({});
    setSelectedPreset(null);
  };

  return (
    <Card
      align="left"
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        p: 2,
      }}
    >
      <CardContent>
        <Typography component="h2" variant="h4" sx={{ py: 2 }}>Select a category</Typography>
        <Grid container spacing={2}>
          {categories.map((category, i) => (
            <Grid item xs='auto' key={category.id}>
              <Button variant={selectedCategory === category ? "outlined" : "contained"} onClick={() => handleCategoryClick(i)}>
                {category.name}
              </Button>
            </Grid>
          ))}
          <Grid item xs='auto'>
            <Link href="/categories">
              <Button variant="contained" color="secondary" startIcon={<AddIcon />}>New</Button>
            </Link>
          </Grid>
        </Grid>

        {selectedCategory && (

          <div>
            { selectedCategory.presets?.length > 0 && (
              <>
              <Typography component="h2" variant="h5" sx={{ py: 2 }}>{selectedCategory.name} Presets</Typography>
              
              <Grid container spacing={2}>
                {selectedCategory.presets?.map((preset, i) => (
                  <Grid item xs='auto' key={`${preset.name}`+i}>
                    <Button variant={selectedPreset === preset ? "outlined" : "contained"} onClick={() => handlePresetClick(preset)}>
                      {preset.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Typography component="h2" variant="h5" sx={{ py: 2 }}>Fields</Typography>
              <List>
              
              {selectedCategory.fields?.map((field, i) => (
                <ListItem key={field}>
                  <TextField
                    label={field}
                    value={fieldValues[field] || ''}
                    onChange={(e) => handleInputChange(field, e)}
                  />
                </ListItem>
              ))}
              </List>
              </>
            )}
            <Box align="center" sx={
              {
                mt: 4,
              }
            }>
              <Button size="large" variant="contained" onClick={postData}>Record</Button>
            </Box>
              
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default LogData;
