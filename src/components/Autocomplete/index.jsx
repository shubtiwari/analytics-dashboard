import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const AutoCompleteComponent = ({ label, options, value, onSelect }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    // Sync the value prop with the internal state when it changes from the parent
    setInternalValue(value);
  }, [value]);

  const handleChange = (event, newValue) => {
    setInternalValue(newValue); // Update the local state
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
        marginRight: '20px',
      }}
    >
      <Autocomplete
        value={internalValue}
        onChange={handleChange} // Call the handleChange function on change
        options={options}
        getOptionLabel={(option) => option} // Assuming options are strings. Modify if options are objects
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      />
    </Box>
  );
};

export default AutoCompleteComponent;
