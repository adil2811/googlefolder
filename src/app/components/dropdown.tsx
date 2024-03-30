import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectProps {
  value1: number;
  value2: number;
  value3: number;
}

export default function BasicSelect({ value1, value2, value3 }: BasicSelectProps) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 100, minHeight: 50 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>{value1}</MenuItem>
          <MenuItem value={20}>{value2}</MenuItem>
          <MenuItem value={30}>{value3}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
