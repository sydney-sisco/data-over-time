import React, { useState } from 'react';
import { Link }from 'wouter';

const CategoryButton = ({ category, onClick }) => {
  return (
    <button onClick={() => onClick(category)}>
      {category}
    </button>
  )
}

const LogData = ({ categories, setData, submitData }) => {
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
  };

  return (
    <div>
      <h2>Select a category:</h2>
      {categories.map((category, i) => (
        <CategoryButton key={category.id} category={category.name} onClick={() => {handleCategoryClick(i)}} />
      ))}
      <Link href="/categories"><button>+ Manage Categories</button></Link>

      {selectedCategory && (
        <div>
          <h2>Selected Category: {selectedCategory.name}</h2>
          
          {/* <h3>Presets</h3>
          {trackingCategories[selectedCategory].presets.map(preset => (
            <button key={preset.name} onClick={() => handlePresetClick(preset.values)}>
              {preset.name}
            </button>
          ))} */}

          <h3>Fields</h3>
          {selectedCategory.fields?.map((field, i) => (
            <div key={i}>
              <label>{field}</label>
              <input type="text" value={fieldValues[field] || ''} onChange={(e) => handleInputChange(field, e)} />
            </div>
          ))}

        </div>
      )}
      <button onClick={postData}>Record</button>
    </div>
  );
};


export default LogData;
