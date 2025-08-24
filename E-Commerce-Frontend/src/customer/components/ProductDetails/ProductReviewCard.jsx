import React from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3} alignItems="flex-start">
        <Grid item xs={1}>
          <Box>
            <Avatar
              sx={{ width: 56, height: 56, bgcolor: "#9155d" }}
              alt="User Avatar"
            >
              R
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={11}>
          {" "}
          {/* Use xs=11 to occupy rest of row */}
          <div className="space-y-2">
            <p className="font-semibold text-lg mb-0">Ram</p>
            <p className="opacity-70 mb-1">August 22, 2025</p>
          </div>
          <Rating
            value={4.5}
            name="half-rating"
            precision={0.5}
            readOnly
            size="small"
          />
          <p className="mt-1 mb-0">What A Product!</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
