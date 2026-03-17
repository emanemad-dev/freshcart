"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiSave,
} from "react-icons/fi";

import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/features/addresses/hooks/useAddresses";

import {
  CreateAddressData,
  Address,
} from "@/features/addresses/types/addresses.types";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ProfilePage() {
  const { data: addressesData, isLoading } = useAddresses();
  const addresses = addressesData?.data || [];

  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();
  const deleteMutation = useDeleteAddress();

  const authUser = useAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState<"addresses" | "settings">(
    "addresses",
  );

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [addressForm, setAddressForm] = useState<CreateAddressData>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const [profileForm, setProfileForm] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setAddressForm({
        name: address.name,
        details: address.details,
        phone: address.phone,
        city: address.city,
      });
      setEditingAddress(address);
    } else {
      setAddressForm({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
      setEditingAddress(null);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("=== Address Update Debug ===");
    console.log("Editing:", editingAddress?._id, "New name:", addressForm.name);

    if (editingAddress) {
      updateMutation.mutate(
        { id: editingAddress._id, data: addressForm },
        {
          onSuccess: () => {
            console.log(
              "Update success! Addresses after:",
              addresses.map((a) => ({ id: a._id, name: a.name })),
            );
            handleCloseModal();
          },
          onError: (error) => {
            console.error("Update error:", error);
          },
        },
      );
    } else {
      createMutation.mutate(addressForm, {
        onSuccess: handleCloseModal,
      });
    }
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Delete this address?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const token = useAuthStore.getState().token;

      await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            currentPassword: passwordForm.currentPassword,
            password: passwordForm.newPassword,
            rePassword: passwordForm.confirmPassword,
          }),
        },
      );

      alert("Password updated");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      alert("Error updating password");
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Profile" }]}
        title="My Account"
        description="Manage your account"
        icon={<FiUser className="text-3xl" />}
      />

      <section className="bg-gradient-to-b from-gray-50 to-white py-10 min-h-screen">
        <div className="px-4">
          <div className="grid lg:grid-cols-[250px_1fr] gap-10 items-start">
            {/* Sidebar */}

            <div className="bg-white border border-gray-200 rounded-xl p-4 h-fit">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                My Account
              </h3>

              {[
                { key: "addresses", label: "My Addresses", icon: FiMapPin },
                { key: "settings", label: "Settings", icon: FiLock },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as any)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition mb-2
                    ${
                      activeTab === item.key
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                    }`}
                  >
                    <Icon className="text-lg" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}

            <div className="space-y-8">
              {/* ADDRESSES */}

              {activeTab === "addresses" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-xl font-semibold">My Addresses</h2>
                      <p className="text-sm text-gray-500">
                        Manage your saved delivery addresses
                      </p>
                    </div>

                    <Button
                      onClick={() => handleOpenModal()}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <FiPlus />
                      Add Address
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                        >
                          <div className="flex gap-3">
                            <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-gray-200 rounded w-32"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <FiMapPin className="text-4xl text-gray-300 mb-3" />

                      <h3 className="font-semibold text-gray-700 mb-1">
                        No addresses yet
                      </h3>

                      <p className="text-sm text-gray-500 mb-4">
                        Add your first delivery address
                      </p>

                      <Button
                        onClick={() => handleOpenModal()}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      >
                        <FiPlus />
                        Add Address
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center col-span-2">
                          <FiMapPin className="text-4xl text-gray-300 mb-3" />
                          <h3 className="font-semibold text-gray-700 mb-1">
                            No addresses yet
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Add your first delivery address
                          </p>
                          <Button
                            onClick={() => handleOpenModal()}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                          >
                            <FiPlus /> Add Address
                          </Button>
                        </div>
                      ) : (
                        addresses.map((address) => (
                          <motion.div
                            key={address._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.25 }}
                            className="group bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-start hover:shadow-lg hover:border-green-300 transition-all duration-300"
                          >
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition">
                                <FiMapPin className="text-green-600 text-sm" />
                              </div>

                              <div>
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {address.name}
                                </h4>
                                {updateMutation.isPending &&
                                  address._id === editingAddress?._id && (
                                    <span className="text-xs text-blue-500 ml-2">
                                      Updating...
                                    </span>
                                  )}

                                <p className="text-xs text-gray-500">
                                  {address.phone}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {address.city}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal(address)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition"
                              >
                                <FiEdit3 size={16} />
                              </button>

                              <button
                                onClick={() => handleDeleteAddress(address._id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS */}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Profile */}

                  <div className="bg-white border border-gray-200 rounded-xl p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <FiUser className="text-green-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">
                          Profile Information
                        </h3>

                        <p className="text-sm text-gray-500">
                          Update your personal details
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        className="focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Email Address"
                        placeholder="example@email.com"
                        className="focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Phone Number"
                        placeholder="01xxxxxxxxx"
                        className="focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            phone: e.target.value,
                          })
                        }
                      />

                      <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                        <FiSave />
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  {/* Change Password */}

                  <div className="bg-white border border-gray-200 rounded-xl p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <FiLock className="text-orange-500" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">
                          Change Password
                        </h3>

                        <p className="text-sm text-gray-500">
                          Update your account password
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-5">
                      {["current", "new", "confirm"].map((type, i) => {
                        const label = [
                          "Current Password",
                          "New Password",
                          "Confirm Password",
                        ][i];

                        const field = [
                          "currentPassword",
                          "newPassword",
                          "confirmPassword",
                        ][i];

                        const placeholder = [
                          "Enter your current password",
                          "Enter your new password",
                          "Confirm your new password",
                        ][i];

                        return (
                          <div key={type}>
                            <label className="block text-sm font-medium mb-1">
                              {label}
                            </label>

                            <div className="relative">
                              <input
                                type={
                                  showPassword[
                                    type as keyof typeof showPassword
                                  ]
                                    ? "text"
                                    : "password"
                                }
                                placeholder={placeholder}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                                value={
                                  passwordForm[
                                    field as keyof typeof passwordForm
                                  ]
                                }
                                onChange={(e) =>
                                  setPasswordForm({
                                    ...passwordForm,
                                    [field]: e.target.value,
                                  })
                                }
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    [type]:
                                      !showPassword[
                                        type as keyof typeof showPassword
                                      ],
                                  })
                                }
                                className="absolute right-3 top-2.5 text-gray-500"
                              >
                                {showPassword[
                                  type as keyof typeof showPassword
                                ] ? (
                                  <FiEyeOff />
                                ) : (
                                  <FiEye />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                        <FiLock />
                        Change Password
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ADDRESS MODAL */}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingAddress ? "Edit Address" : "Add New Address"}
      >
        <form onSubmit={handleSubmitAddress} className="space-y-5 pt-2">
          <Input
            label="Address Name"
            placeholder="Home, Office..."
            value={addressForm.name}
            onChange={(e) =>
              setAddressForm({ ...addressForm, name: e.target.value })
            }
          />

          <Input
            label="Full Address"
            placeholder="Street, building..."
            value={addressForm.details}
            onChange={(e) =>
              setAddressForm({ ...addressForm, details: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone"
              placeholder="01xxxxxxxxx"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
            />

            <Input
              label="City"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              variant="outline"
              type="button"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {editingAddress ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
