import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch } from "react-redux";

const DeliveryAddressForm = () => {
const dispatch = useDispatch();
const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      phoneNumber: data.get("phoneNumber"),
    };
    console.log("Address Submit", address);
  

  const orderData = {address, navigate}
//dispatch(createOrder(orderdata))
console.log("address", orderData)
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "95%",
          maxWidth: "1100px", // reduced max width
          minHeight: "450px", // slightly smaller height
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            flex: { xs: "none", md: "1 1 50%" },
            bgcolor: "#fafafa",
            borderRight: { xs: "none", md: "1px solid #eee" },
            p: 2.5, // smaller padding
            minWidth: 280,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Saved Address
          </Typography>
          <AddressCard />
          <Button
            variant="contained"
            color="secondary"
            size="small" // smaller button
            sx={{ mt: 2, width: "100%" }}
          >
            Change Address
          </Button>
        </Box>

        {/* Right side form */}
        <Box
          sx={{
            flex: { xs: "none", md: "1 1 50%" },
            bgcolor: "#fff",
            p: 3,
            minWidth: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                fullWidth
                required
                size="small"
              />
              <TextField
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                fullWidth
                required
                size="small"
              />
            </Box>

            <TextField
              label="Address"
              name="address"
              autoComplete="address"
              fullWidth
              multiline
              rows={3}
              required
              size="small"
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                my: 2,
              }}
            >
              <TextField
                label="City"
                name="city"
                autoComplete="city"
                fullWidth
                required
                size="small"
              />
              <TextField
                label="State/Province/Region"
                name="state"
                autoComplete="state"
                fullWidth
                required
                size="small"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                label="Zip / Postal Code"
                name="zip"
                autoComplete="zip"
                fullWidth
                required
                size="small"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                fullWidth
                required
                size="small"
              />
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mt: 2, width: "100%" }}
              type="submit"
            >
              Deliver Here
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default DeliveryAddressForm;
