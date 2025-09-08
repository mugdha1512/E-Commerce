import { StarIcon } from "@heroicons/react/20/solid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ProductReviewCard from "./ProductReviewCard";
import { Box, LinearProgress } from "@mui/material";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { mens_kurta } from "../../../Data/Men/mens_kurta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { id: "white", name: "White", classes: "bg-white checked:outline-gray-400" },
    { id: "gray", name: "Gray", classes: "bg-gray-200 checked:outline-gray-400" },
    { id: "black", name: "Black", classes: "bg-gray-900 checked:outline-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "The 6-Pack includes two black, two white, and two heather gray Basic Tees.",
};

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white lg:px-20 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-md p-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-1 text-xs text-gray-600 select-none">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id} className="flex items-center">
                <a
                  href={breadcrumb.href}
                  className="mr-1 font-medium text-gray-800 hover:text-indigo-600 transition"
                >
                  {breadcrumb.name}
                </a>
                <svg
                  fill="currentColor"
                  width={12}
                  height={16}
                  viewBox="0 0 16 20"
                  className="text-gray-300"
                  aria-hidden="true"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </li>
            ))}
            <li>
              <a
                href={product.href}
                className="text-gray-500 hover:text-indigo-600 transition"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Product Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 px-4 lg:px-8">
          {/* Images */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[22rem] max-h-[22rem] shadow-lg">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="rounded-lg object-cover w-full h-full max-lg:hidden transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex space-x-4 mt-3">
              {product.images.slice(1).map((img) => (
                <div
                  key={img.src}
                  className="w-20 h-20 overflow-hidden rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Info */}
          <div className="max-w-xl px-4 sm:px-6 py-4 bg-white rounded-lg shadow-sm">
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
              Universal Outfit
            </h1>
            <p className="text-sm text-gray-700 opacity-80 mt-1">
              Casual Puff Sleeves Women White Top
            </p>

            {/* Price */}
            <div className="flex space-x-4 items-center text-gray-900 mt-5 text-sm sm:text-base font-semibold">
              <p className="font-bold text-xl">₹199</p>
              <p className="opacity-50 line-through text-base">₹211</p>
              <p className="text-green-600 font-semibold">5% Off</p>
            </div>

            {/* Reviews */}
            <div className="mt-5 flex items-center space-x-3">
              <Rating
                name="half-rating-read"
                precision={0.5}
                value={4.5}
                readOnly
                size="small"
              />
              <p className="opacity-70 text-xs">1,230 Ratings</p>
              <p className="ml-3 text-xs font-medium text-indigo-700 hover:text-indigo-500 cursor-pointer">
                500 Reviews
              </p>
            </div>

            {/* Sizes */}
            <form className="mt-8">
              <h3 className="text-xs font-medium text-gray-900 mb-2">Size</h3>
              <fieldset>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <label
                      key={size.name}
                      className="group relative flex items-center justify-center rounded border border-gray-300 bg-white py-3 text-xs cursor-pointer select-none transition hover:border-indigo-500"
                    >
                      <input
                        defaultValue={size.name}
                        name="size"
                        type="radio"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="uppercase text-gray-900 group-hover:text-indigo-600 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-opacity-50">
                        {size.name}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="secondary"
                sx={{
                  px: "1.25rem",
                  py: "0.5rem",
                  fontSize: "0.875rem",
                  mt: 6,
                  borderRadius: "0.375rem",
                }}
                fullWidth
              >
                Add to Cart
              </Button>
            </form>

            {/* Description */}
            <div className="pt-6 text-xs leading-relaxed text-gray-700 max-w-full">
              <p>{product.description}</p>
            </div>
          </div>
        </section>

        {/* Reviews + Ratings */}
        <section className="mx-auto max-w-5xl pt-10">
          <h1 className="font-semibold text-base pb-4">Recent Review & Rating</h1>
          <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                {[1, 2].map((_, idx) => (
                  <ProductReviewCard key={idx} />
                ))}
              </div>
              <div className="flex-2 flex flex-col justify-center">
                <h2 className="text-sm font-semibold pb-3">Product Ratings</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <Rating value={4.5} precision={0.5} readOnly size="small" />
                  <p className="opacity-60 text-xs">54,890 Ratings</p>
                </div>
                {["Excellent", "Very Good", "Good", "Average", "Poor"].map(
                  (label, i) => (
                    <div key={i} className="flex items-center w-full mt-3">
                      <p className="mr-4 w-[6rem] text-xs">{label}</p>
                      <LinearProgress
                        variant="determinate"
                        value={[90, 70, 40, 30, 10][i]}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          width: "100%",
                          backgroundColor: "#f3f4f6",
                        }}
                      />
                      <p className="ml-4 text-xs">54,321</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="text-base font-semibold mb-5">Similar Products</h1>
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {mens_kurta.map((item, idx) => (
              <HomeSectionCard key={idx} product={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
