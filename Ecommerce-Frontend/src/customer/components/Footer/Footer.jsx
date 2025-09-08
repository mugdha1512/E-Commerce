import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";

const Footer = () => {
  return (
    <div>
      {/* Main Footer Sections */}
      <Grid
        container
        className="bg-black text-white text-center mt-10"
        sx={{ bgcolor: "black", color: "white", py: 5 }}
        spacing={4}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {/* Company Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>
          {["About", "Blogs", "Press", "Jobs", "Partners"].map((text) => (
            <div key={text}>
              <Button className="" color="inherit">
                <Typography variant="body3">{text}</Typography>
              </Button>
            </div>
          ))}
        </Grid>

        {/* Support Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-5" variant="h6">
            Support
          </Typography>
          {["Contact Us", "Help Center", "Privacy Policy", "Terms"].map(
            (text) => (
              <div key={text}>
                <Button className="" color="inherit">
                  <Typography variant="body3">{text}</Typography>
                </Button>
              </div>
            )
          )}
        </Grid>

        {/* Services Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-5" variant="h6">
            Services
          </Typography>
          {["Payments", "Shipping", "Returns", "FAQ"].map((text) => (
            <div key={text}>
              <Button className="" color="inherit">
                <Typography variant="body3">{text}</Typography>
              </Button>
            </div>
          ))}
        </Grid>

        {/* Social Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-5" variant="h6">
            Follow Us
          </Typography>
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((text) => (
            <div key={text}>
              <Button className="" color="inherit">
                <Typography variant="body3">{text}</Typography>
              </Button>
            </div>
          ))}
        </Grid>
      </Grid>

      {/* Copyright Row */}
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          py: 2,
          textAlign: "center",
          borderTop: "1px solid #333", // thin line on top for separation
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Shop. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
