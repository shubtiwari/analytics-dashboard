import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const AutoCompleteComponent = () => {
  const [value, setValue] = useState(null);
  
  const options = [
    { title: 'Apple' },
    { title: 'Banana' },
    { title: 'Cherry' },
    { title: 'Date' },
    { title: 'Elderberry' },
    { title: 'Fig' },
    { title: 'Grape' },
    { title: 'Honeydew' },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label="Select Fruit" variant="outlined" />}
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
