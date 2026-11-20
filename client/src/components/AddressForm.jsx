import React, { useState } from 'react';

const AddressForm = () => {
    const [form, setForm] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        pin: "",
        country: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Street Address"
                    value={form.street}
                    onChange={handleChange}
                    autoComplete="street-address"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="State / Province"
                    value={form.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="pin"
                    id="pin"
                    placeholder="PIN Code / Postal Code"
                    value={form.pin}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full sm:w-fit"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default AddressForm;