"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useAddresses,
  useCreateAddress,
  useDeleteAddress,
} from "@/features/addresses/hooks/useAddresses";
import { Address } from "@/features/addresses/types/addresses.types";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCog,
  FaTrash,
  FaEdit,
  FaPlus,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

type TabType = "profile" | "addresses" | "settings";

export default function ProfilePage() {
  const {
    user,
    isAuthenticated,
    updateProfile,
    changePassword,
    isLoading: authLoading,
  } = useAuth();
  const { data: addressesData, isLoading: addressesLoading } = useAddresses();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  const [addressForm, setAddressForm] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.password === passwordForm.rePassword) {
      changePassword(passwordForm);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAddress.mutate(addressForm);
    setAddressForm({ name: "", details: "", phone: "", city: "" });
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddress.mutate(id);
    }
  };

  if (!isAuthenticated && !authLoading) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: "Profile" }]}
          title="My Profile"
          icon={<FaUser />}
        />
        <div className="container mx-auto px-4 py-8">
          <p>Please login to view your profile</p>
        </div>
      </>
    );
  }

  const tabs = [
    { id: "profile" as TabType, label: "My Account", icon: FaUser },
    { id: "addresses" as TabType, label: "My Addresses", icon: FaMapMarkerAlt },
    { id: "settings" as TabType, label: "Settings", icon: FaCog },
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Profile" }]}
        title="My Account"
        description="Update your profile information and manage your addresses"
        icon={<FaUser />}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="md:w-64 flex-shrink-0">
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-green-50 shadow-sm"
                  }`}
                >
                  <tab.icon className="text-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Information Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    Profile Information
                  </h2>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your name"
                      />
                      <Input
                        label="Email Address"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                    <Input
                      label="Phone Number"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="01xxxxxxxxx"
                    />
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                      Save Changes
                    </Button>
                  </form>
                </div>

                {/* Account Information Card */}
                <div className="bg-green-50 rounded-2xl shadow-sm p-8">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FaCog className="text-green-600" />
                    Account Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-gray-500 mb-1">User ID</p>
                      <p className="font-mono text-gray-700">
                        {user?._id || "—"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-gray-500 mb-1">Role</p>
                      <p className="font-medium text-gray-700">user</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-600" />
                    Manage your saved delivery addresses
                  </h2>
                  <Button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <FaPlus className="text-sm" />
                    Add Address
                  </Button>
                </div>

                {showAddressForm && (
                  <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      Add New Address
                    </h3>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <Input
                        label="Address Name"
                        value={addressForm.name}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Home / Office"
                      />
                      <Input
                        label="City"
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e.target.value,
                          })
                        }
                        placeholder="Mansoura"
                      />
                      <Input
                        label="Full Address"
                        value={addressForm.details}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            details: e.target.value,
                          })
                        }
                        placeholder="Street, building..."
                      />
                      <Input
                        label="Phone"
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="01207995306"
                      />
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="submit"
                          className="px-6 bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {addressesLoading ? (
                  <p className="text-gray-500">Loading addresses...</p>
                ) : addressesData?.data?.length === 0 ? (
                  <div className="bg-green-50 rounded-2xl shadow-sm p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaMapMarkerAlt className="text-3xl text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No Addresses Yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Add your first delivery address to make checkout faster
                      and easier.
                    </p>
                    <Button
                      onClick={() => setShowAddressForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Add Your First Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addressesData?.data?.map((address: Address) => (
                      <div
                        key={address._id}
                        className="bg-white rounded-2xl shadow-sm p-6 relative hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <FaHome className="text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {address.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {address.city}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {address.details}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <FaPhone className="text-xs" />
                          {address.phone}
                        </div>
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <FaEdit className="text-xs" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address._id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <FaCog className="text-green-600" />
                  Change Password
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter your current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your new password"
                  />
                  <p className="text-xs text-gray-500">
                    Must be at least 6 characters
                  </p>
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm.rePassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        rePassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your new password"
                  />
                  <Button
                    type="submit"
                    className="px-8 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Change Password
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
