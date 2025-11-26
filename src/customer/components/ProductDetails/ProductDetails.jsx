import { StarIcon } from "@heroicons/react/20/solid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ProductReviewCard from "./ProductReviewCard";
import { Box, LinearProgress } from "@mui/material";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { mens_kurta } from "../../../Data/Men/mens_kurta";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";

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
    "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: \"Black\". Need to add an extra pop of color to your outfit? Our white tee has you covered.",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming \"Charcoal Gray\" limited release.",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.products);

  console.log("-----", params.productId);

  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize };
    console.log("Adding to cart:", data);
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    if (params.productId) {
      dispatch(findProductById(params.productId));
    } else {
      console.warn("No productId in URL params – check your route");
    }
  }, [params.productId, dispatch]);

  /* ------------------- Loading / Error UI ------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Loading product...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 font-medium">Error: {error}</div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {(product.breadcrumbs || []).map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title || product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Main Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[30rem]">
              <img
                alt={product.images?.[0]?.alt || "Product image"}
                src={product.imageUrl || product.images?.[0]?.src}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
              />
            </div>
            <div className="flex space-x-5 justify-center mt-4">
              {(product.images || []).slice(1).map((img, idx) => (
                <div key={idx} className="w-32 h-32 overflow-hidden rounded-lg">
                  <img
                    src={typeof img === "string" ? img : img.src}
                    alt={typeof img === "string" ? "" : img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product.brand || "Universal Outfit"}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {product.title || product.name || "Casual Puff Sleeves Women White Top"}
              </h1>
            </div>

            {/* Price */}
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="font-semibold">
                ₹{product.discountedPrice || product.price || 199}
              </p>
              {product.price && (
                <p className="opacity-50 line-through">
                  ₹{product.price}
                </p>
              )}
              {product.discountPercent && (
                <p className="text-green-600 font-semibold">
                  {product.discountPercent}% Off
                </p>
              )}
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  value={product.averageRating || 4.5}
                  readOnly
                />
                <p className="opacity-50 text-sm">
                  {product.totalRatings || "1,230"} Ratings
                </p>
                <p className="ml-3 text-sm font-medium text-indigo-700 hover:text-indigo-500">
                  {product.totalReviews || "500"} Reviews
                </p>
              </div>
            </div>

            {/* SIZE SECTION  */}
            <form className="mt-10">
              <h3 className="text-xs font-medium text-gray-900 mb-2">Size</h3>
              <fieldset>
                <div className="grid grid-cols-4 gap-3">
                  {(() => {
                    const availableSizes = product.sizes?.length > 0
                      ? product.sizes
                      : [
                        { name: "S", inStock: true },
                        { name: "M", inStock: true },
                        { name: "L", inStock: true },
                        { name: "XL", inStock: true },
                      ];

                    return availableSizes.map((size) => {
                      const isSelected = selectedSize === size.name;
                      const isDisabled = !size.inStock;

                      return (
                        <label
                          key={size.name}
                          className={`
                group relative flex items-center justify-center
                rounded-md border py-3 text-xs font-medium uppercase
                cursor-pointer transition-all duration-200
                ${isSelected
                              ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                              : "border-gray-300 bg-white text-gray-900 hover:border-indigo-500"
                            }
                ${isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : ""
                            }
              `}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size.name}
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => setSelectedSize(size.name)}
                            className="sr-only"   // hidden but accessible
                          />
                          <span>{size.name}</span>
                        </label>
                      );
                    });
                  })()}
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
                disabled={!selectedSize}
              >
                Add to Cart
              </Button>
            </form>

            {/* Description, Highlights, Details */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description || "No description available."}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {(product.highlights || []).map((highlight, i) => (
                      <li key={i} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {product.details || "No details available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews & Ratings */}
        <section className="mx-auto max-w-6xl pt-8">
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border border-gray-200 p-8 rounded-lg bg-white">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="space-y-5">
                  {[1, 2, 3].map((_, idx) => (
                    <ProductReviewCard key={idx} />
                  ))}
                </div>
              </div>
              <div className="flex-2 flex flex-col justify-center">
                <h2 className="text-xl font-semibold pb-2">Product Ratings</h2>
                <div className="flex items-center space-x-5 mb-5">
                  <Rating value={4.5} precision={0.5} readOnly />
                  <p className="opacity-60">54890 Ratings</p>
                </div>
                {[
                  { label: "Excellent", value: 90, color: "#16a34a" },
                  { label: "Very Good", value: 70, color: "#22c55e" },
                  { label: "Good", value: 40, color: "#eab308" },
                  { label: "Average", value: 30, color: "#f97316" },
                  { label: "Poor", value: 10, color: "#dc2626" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center w-full mt-3">
                    <p className="mr-5 w-[8rem]">{item.label}</p>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        width: "100%",
                        backgroundColor: "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: item.color,
                        },
                      }}
                    />
                    <p className="ml-5">54321</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==== SIMILAR PRODUCTS – 4 COLUMNS, EVEN SPACING, NO BLANK RIGHT SIDE ==== */}
        <section className="pt-10">
          <h1 className="text-base font-semibold mb-5">Similar Products</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {mens_kurta.slice(0, 8).map((item, idx) => (
              <HomeSectionCard key={idx} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}