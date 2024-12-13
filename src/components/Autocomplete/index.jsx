import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const AutoCompleteComponent = ({ label, options, onSelect }) => {
  const [value, setValue] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the local state
    if (onSelect) {
      onSelect(newValue); // Pass the selected value to the parent
    }
  };
  

  return (
    <Box
      sx={{
        display: 'inline-block',
        minWidth: 200,
        maxWidth: '100%',
      }}
    >
      <Autocomplete
        value={value}
        onChange={handleChange} // Call the handleChange function on change
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        renderOption={(props, option) => (
          <li {...props}>
            {option.title}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.title === value?.title}
      />
    </Box>
  );
};

export default AutoCompleteComponent;
