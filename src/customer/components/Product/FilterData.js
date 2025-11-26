export const filters = [
  {
    id: "color",
    name: "Color",
    // Multi-select (checkbox) by default, no type needed
    options: [
      { value: "white", label: "White", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "red", label: "Red", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
      { value: "orange", label: "Orange", checked: false },
      { value: "beige", label: "Beige", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    // Multi-select (checkbox) by default
    options: [
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "xxl", label: "XXL", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    type: "radio", // Set as radio filter for single selection
    options: [
      { value: "0-499", label: "₹0 to ₹499", checked: false },
      { value: "500-999", label: "₹500 to ₹999", checked: false },
      { value: "1000-1499", label: "₹1000 to ₹1499", checked: false },
      { value: "1500-1999", label: "₹1500 to ₹1999", checked: false },
      { value: "2000+", label: "₹2000 and above", checked: false },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    type: "radio", // Set as radio for single selection
    options: [
      { value: "10", label: "10% or more", checked: false },
      { value: "20", label: "20% or more", checked: false },
      { value: "30", label: "30% or more", checked: false },
      { value: "50", label: "50% or more", checked: false },
      { value: "70", label: "70% or more", checked: false },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    type: "radio", // Single selection for availability status
    options: [
      { value: "instock", label: "In Stock", checked: false },
      { value: "outofstock", label: "Out of Stock", checked: false },
    ],
  },
];
