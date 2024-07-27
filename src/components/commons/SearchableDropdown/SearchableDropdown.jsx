import React, { useEffect, useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const SearchableDropdown = ({ label, onSelectionChange }) => {
  const dropdownData = useSelector(
    (state) => state?.dropdownStoreReducer?.dropDownResponse
  );
  const loading = useSelector((state) => state?.dropdownStoreReducer?.loading);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!loading) {
      setOptions(dropdownData);
    }
  }, [dropdownData, loading]);
  
  const memoizedOptions = useMemo(() => options, [options]);

  const handleChange = (event, newValue) => {
    onSelectionChange(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="searchable-dropdown"
      options={memoizedOptions}
      getOptionLabel={(option) => option?.label || ""}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label={label} />}
      style={{ width: 300 }}
    />
  );
};

export default SearchableDropdown;
