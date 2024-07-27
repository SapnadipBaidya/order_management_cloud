import React, { useEffect, useState, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const SearchableDropdown = ({ label }) => {
  const dropdownData = useSelector((state) => state?.dropdownStoreReducer?.dropDownResponse);
  const loading = useSelector((state) => state?.dropdownStoreReducer?.loading);
  const [options, setOptions] = useState([]);

  // Update options only when dropdownData changes
  useEffect(() => {
    if (!loading) {
      setOptions(dropdownData);
      console.log("sapna", dropdownData);
    }
  }, [dropdownData, loading]);

  // Memoize options to prevent unnecessary re-renders
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <Autocomplete
      disablePortal
      id="searchable-dropdown"
      options={memoizedOptions}
      getOptionLabel={(option) => option?.label || ''}
      renderInput={(params) => <TextField {...params} label={label} />}
      style={{ width: 300 }}
    />
  );
};

export default SearchableDropdown;