"use client";

import { useState, useEffect } from "react";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { Address } from "@/features/addresses/types/addresses.types";

interface ShippingFormProps {
  formData: {
    city: string;
    street: string;
    phone: string;
    paymentMethod?: "cash" | "card";
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (
    data:
      | Partial<{
          city: string;
          street: string;
          phone: string;
          paymentMethod?: "cash" | "card";
        }>
      | ((prev: {
          city: string;
          street: string;
          phone: string;
          paymentMethod?: "cash" | "card";
        }) => any),
  ) => void;
  setSelectedAddress?: (address: Address | null) => void;
  showChangeButton?: boolean;
}

export function ShippingForm({
  formData,
  errors,
  onChange,
  setFormData,
  setSelectedAddress,
  showChangeButton = true,
}: ShippingFormProps) {
  const { data: addresses, isLoading } = useAddresses();

  const [selectedAddress, setSelectedAddressInternal] =
    useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [prevAddress, setPrevAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (setSelectedAddress) setSelectedAddress(selectedAddress);
  }, [selectedAddress, setSelectedAddress]);

  useEffect(() => {
    if (!isLoading && addresses?.data?.length > 0 && !selectedAddress) {
      const firstAddress = addresses.data[0];

      setSelectedAddressInternal(firstAddress);

      setFormData((prev) => ({
        ...prev,
        city: firstAddress.city,
        street: firstAddress.details,
        phone: firstAddress.phone,
      }));
    }
  }, [addresses, isLoading, selectedAddress, setFormData]);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressInternal(address);
    setShowForm(false);

    setFormData((prev) => ({
      ...prev,
      city: address.city,
      street: address.details,
      phone: address.phone,
    }));
  };

  const handleChangeAddress = () => {
    setPrevAddress(selectedAddress);
    setSelectedAddressInternal(null);
    setShowForm(true);

    setFormData((prev) => ({
      ...prev,
      city: "",
      street: "",
      phone: "",
    }));
  };

  const handleCancelChange = () => {
    if (prevAddress) handleAddressSelect(prevAddress);
    setShowForm(false);
  };

  if (isLoading) return <div>Loading addresses...</div>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">
      <div className="bg-green-600 text-white px-6 py-4 flex items-center gap-3 font-semibold text-lg rounded-t-xl">
        <FaHome /> Shipping Address
      </div>

      <div className="p-6">
        {addresses?.data?.length > 0 && !showForm ? (
          <>
            <div className="space-y-3 mb-5">
              {addresses.data.map((address) => (
                <div
                  key={address._id}
                  className={`border rounded-xl p-5 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition ${
                    selectedAddress?._id === address._id
                      ? "border-green-400 bg-green-50 ring-2 ring-green-200"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <FaMapMarkerAlt
                    className={`text-2xl mt-1 ${
                      selectedAddress?._id === address._id
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-base">
                      {address.name}
                    </p>
                    <p className="text-sm text-gray-600">{address.details}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {address.city} • {address.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedAddress && showChangeButton && (
              <div
                className="border-2 border-dashed border-green-400 text-green-600 rounded-lg p-4 text-sm font-medium mb-5 cursor-pointer hover:bg-green-50 text-center transition"
                onClick={handleChangeAddress}
              >
                Change Address
              </div>
            )}
          </>
        ) : null}

        {(showForm || !selectedAddress) && (
          <>
            <div className="flex justify-between items-center mb-5">
              <div className="bg-green-50 text-green-700 text-sm p-4 rounded-lg flex-1">
                Delivery Information: Please ensure your address is accurate
              </div>
              {prevAddress && (
                <button
                  type="button"
                  className="ml-3 text-sm px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
                  onClick={handleCancelChange}
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  placeholder="e.g. Cairo, Alexandria, Giza"
                  className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  name="street"
                  value={formData.street}
                  onChange={onChange}
                  placeholder="Street name, building number, floor, apartment..."
                  className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.street ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  placeholder="01xxxxxxxxx"
                  className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
