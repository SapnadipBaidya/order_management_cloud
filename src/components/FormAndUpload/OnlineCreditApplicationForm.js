import React, { useState } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box
} from '@mui/material';

const currencies = [
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
  {
    value: 'JPY',
    label: 'JPY',
  },
  // Add more currencies as needed
];

const OnlineCreditApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    address: '',
    orderAmount: '',
    localCurrency: '',
    globalCurrency: '',
    creditLimit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form values:', formValues);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Order Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Order Amount (Local Currency)"
          name="orderAmount"
          type="number"
          value={formValues.orderAmount}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Local Currency"
          name="localCurrency"
          value={formValues.localCurrency}
          onChange={handleChange}
          margin="normal"
          required
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="Global Currency"
          name="globalCurrency"
          value={formValues.globalCurrency}
          onChange={handleChange}
          margin="normal"
          required
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Credit Limit (Local Currency)"
          name="creditLimit"
          type="number"
          value={formValues.creditLimit}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default OnlineCreditApplicationForm;