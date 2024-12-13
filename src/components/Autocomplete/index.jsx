import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const AutoCompleteComponent = ({ label, options }) => {
  const [value, setValue] = useState(null);

  return (
    <Box sx={{
      display: 'inline-block',
      minWidth: 200,
      maxWidth: '100%',
    }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
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
