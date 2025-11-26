"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { filters } from "./FilterData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";
import Pagination from "@mui/material/Pagination";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  // ✅ fix: select products slice correctly
  const productsState = useSelector((store) => store.products);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilter = (value, sectionId, type) => {
    const searchParams = new URLSearchParams(location.search);

    if (type === "radio") {
      searchParams.set(sectionId, value);
      navigate({ search: `?${searchParams.toString()}` });
      return;
    }

    let filterValues = searchParams.get(sectionId)?.split(",") || [];
    if (filterValues.includes(value)) {
      filterValues = filterValues.filter((item) => item !== value);
      if (filterValues.length === 0) {
        searchParams.delete(sectionId);
      } else {
        searchParams.set(sectionId, filterValues.join(","));
      }
    } else {
      filterValues.push(value);
      searchParams.set(sectionId, filterValues.join(","));
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

    const data = {
      category: param.levelThree,
      colors: colorValue || [],
      sizes: sizeValue || [], // ✅ fixed here
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || 0,
      pageNumber: Number(pageNumber) - 1,
      pageSize: 1,
      stock: stock,
    };

    dispatch(findProducts(data));
  }, [
    param.levelThree,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
  ]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Mobile Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon className="size-5 group-data-open:hidden" />
                          <MinusIcon className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.type === "radio" ? (
                          <FormControl>
                            <RadioGroup
                              name={section.id}
                              value={
                                new URLSearchParams(location.search).get(
                                  section.id
                                ) || ""
                              }
                              onChange={(e) =>
                                handleFilter(e.target.value, section.id, "radio")
                              }
                            >
                              {section.options.map((option, idx) => (
                                <FormControlLabel
                                  key={idx}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {section.options.map((option, idx) => {
                              const selectedValues =
                                new URLSearchParams(location.search)
                                  .get(section.id)
                                  ?.split(",") || [];
                              return (
                                <FormControlLabel
                                  key={idx}
                                  control={
                                    <Checkbox
                                      checked={selectedValues.includes(
                                        option.value
                                      )}
                                      onChange={() =>
                                        handleFilter(
                                          option.value,
                                          section.id,
                                          "checkbox"
                                        )
                                      }
                                    />
                                  }
                                  label={option.label}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop view */}
        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="ml-6 lg:hidden text-gray-400 hover:text-gray-500"
              >
                <FunnelIcon className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <div>
                <div className="py-5 flex justify-between items-center">
                  <h1 className="text-lg opacity-50 font-semibold">Filters</h1>
                  <FilterAltIcon />
                </div>
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon className="size-5 group-data-open:hidden" />
                            <MinusIcon className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        {section.type === "radio" ? (
                          <FormControl>
                            <RadioGroup
                              name={section.id}
                              value={
                                new URLSearchParams(location.search).get(
                                  section.id
                                ) || ""
                              }
                              onChange={(e) =>
                                handleFilter(e.target.value, section.id, "radio")
                              }
                            >
                              {section.options.map((option, idx) => (
                                <FormControlLabel
                                  key={idx}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {section.options.map((option, idx) => {
                              const selectedValues =
                                new URLSearchParams(location.search)
                                  .get(section.id)
                                  ?.split(",") || [];
                              return (
                                <FormControlLabel
                                  key={idx}
                                  control={
                                    <Checkbox
                                      checked={selectedValues.includes(
                                        option.value
                                      )}
                                      onChange={() =>
                                        handleFilter(
                                          option.value,
                                          section.id,
                                          "checkbox"
                                        )
                                      }
                                    />
                                  }
                                  label={option.label}
                                />
                              );
                            })}
                          </div>
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className="flex flex-wrap justify-center bg-white py-5">
                  {productsState.products?.content?.map((item, idx) => (
                    <ProductCard key={idx} product={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px=[3.6rem">
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                count={productsState.products?.totalPages || 0}
                color="secondary"
                page={Number(pageNumber)}
                onChange={handlePaginationChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
