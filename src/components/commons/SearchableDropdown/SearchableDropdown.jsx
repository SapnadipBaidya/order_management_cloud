import React, { useEffect, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const SearchableDropdown = ({ label, onSelectionChange }) => {
  const dropdownData = useSelector(
    (state) => state?.dropdownStoreReducer?.dropDownResponse
  );
  const loading = useSelector((state) => state?.dropdownStoreReducer?.loading);
  const optionsRef = useRef([]);

  useEffect(() => {
    if (!loading) {
      optionsRef.current = dropdownData;
    }
  }, [dropdownData, loading]);

  const handleChange = (event, newValue) => {
    onSelectionChange(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      id="searchable-dropdown"
      options={optionsRef.current}
      getOptionLabel={(option) => option?.label || ""}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label={label} />}
      style={{ width: 300 }}
    />
  );
};

export default SearchableDropdown;
