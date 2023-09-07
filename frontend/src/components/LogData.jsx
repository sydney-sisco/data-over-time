import React, { useState } from 'react';
import { Link }from 'wouter';
import { Button, TextField, List, ListItem, Typography, Card, CardContent } from '@mui/material';

const CategoryButton = ({ category, onClick }) => {
  return (
    // <button onClick={() => onClick(category)}>
    //   {category}
    // </button>
    <Button variant="outlined" onClick={() => onClick(category)}>
      {category}
    </Button>
  )
}

const LogData = ({ categories, submitData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fieldValues, setFieldValues] = useState({});

  const handleCategoryClick = (categoryIndex) => {
    setSelectedCategory(categories[categoryIndex]);
    setFieldValues({});
  };

  const handlePresetClick = (presetValues) => {
    setFieldValues(presetValues);
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
  };

  return (
    <div>
      <h2>Select a category:</h2>
      {categories.map((category, i) => (
        <CategoryButton key={category.id} category={category.name} onClick={() => {handleCategoryClick(i)}} />
      ))}
      <Link href="/categories">
        {/* <button>+ Manage Categories</button> */}
        <Button variant="contained">+ Manage Categories</Button>
      </Link>

      {selectedCategory && (
        <div>
          <h2>Selected Category: {selectedCategory.name}</h2>
          
          <h3>Presets</h3>
          {selectedCategory.presets?.map(preset => (
            // <button key={preset.name} onClick={() => handlePresetClick(preset.values)}>
            //   {preset.name}
            // </button>
            <Button variant="outlined" onClick={() => handlePresetClick(preset.values)}>
              {preset.name}
            </Button>
          ))}

          <h3>Fields</h3>
          {selectedCategory.fields?.map((field, i) => (
            <div key={i}>
              <label>{field}</label>
              <input type="text" value={fieldValues[field] || ''} onChange={(e) => handleInputChange(field, e)} />
            </div>
          ))}

        {/* <button onClick={postData}>Record</button> */}
        <Button variant="contained" onClick={postData}>Record</Button>
        </div>
      )}
    </div>
  );
};


export default LogData;
