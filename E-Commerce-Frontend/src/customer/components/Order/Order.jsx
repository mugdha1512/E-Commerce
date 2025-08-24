import React from 'react';
import OrderCard from './OrderCard';

const orderStatus = [
    { lable: "On The way", value: "on_the_way" },
    { lable: "Delivered", value: "delivered" },
    { lable: "Cancelled", value: "cancelled" },
    { lable: "Returned", value: "returned" },
];

const Order = () => {
    return (
        <div className="flex flex-row justify-between px:5 lg:px-20">

            {/* Sidebar Filter */}
            <div className="w-1/5 h-auto shadow-lg bg-white p-5 sticky top-5">
                <h1 className="font-bold text-lg">Filter</h1>
                <div className="space-y-4 mt-10">
                    <h1 className="font-semibold">ORDER STATUS</h1>
                    {orderStatus.map((option) => (
                        <div className="flex items-center" key={option.value}>
                            <input
                                id={option.value}
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                className="ml-3 text-sm text-gray-600"
                                htmlFor={option.value}
                            >
                                {option.lable}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Card Section */}
            <div item xs={9} className="w-4/5">
                <div className='space-y-5'>
                    {[1, 1, 1, 1, 1, 1].map((item) => <OrderCard />)}
                </div>

            </div>
        </div>
    );
};

export default Order;
