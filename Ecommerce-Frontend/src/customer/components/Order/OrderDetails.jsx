import React from 'react'
import { Box, Grid } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { deepPurple } from '@mui/material/colors'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="font-bold text-xl py-4">Delivery Address</h1>
        <AddressCard />
      </div>

      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>

      <div className="space-y-5" container>
        {[1,1,1,1,1,1].map((item)=><Grid
          container
          className="shadow-lg roundFFed-md p-5 bg-white"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Grid item xs={6}>
            <div className="flex items-center space-x-4">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src="https://rukminim1.flixcart.com/image/612/612/xif0q/jean/d/s/c/36-mj-bk-pl-48-comfits-original-imagqbrnyjfzhs8v.jpeg?q=70"
                alt=""
              />
              <div className="space-y-2 ml-5">
                <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
                <p className="space-x-5 opacity-50 text-xs font-semibold">
                  <span>Color: Black</span> <span>Size: M</span>
                </p>
                <p>Seller: Linaria</p>
                <p>₹1099</p>
              </div>
            </div>
          </Grid>

          <Grid item>
            <Box
              sx={{
                color: deepPurple[500],
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <StarIcon sx={{ fontSize: 24, mr: 1 }} />
              <span>Rate & Review Product</span>
            </Box>
          </Grid>
        </Grid>)}
        
      </div>
    </div>
  )
}

export default OrderDetails
