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

  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "settings"
  >("profile");

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const [addressForm, setAddressForm] = useState<CreateAddressData>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const [profileForm, setProfileForm] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    phone: "",
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
      setAddressForm({ name: "", details: "", phone: "", city: "" });
      setEditingAddress(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null);
    setAddressForm({ name: "", details: "", phone: "", city: "" });
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateMutation.mutate(
        { id: editingAddress._id, data: addressForm },
        { onSuccess: () => handleCloseModal() },
      );
    } else {
      createMutation.mutate(addressForm, {
        onSuccess: () => handleCloseModal(),
      });
    }
  };

  const handleDeleteAddress = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => setShowDeleteConfirm(null) });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const token = useAuthStore.getState().token;
      const response = await fetch(
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
      if (!response.ok) throw new Error("Failed to update password");
      alert("Password updated successfully");
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
        description="Manage your account and addresses."
        icon={<FiUser className="text-3xl" />}
      />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10">
            {/* Sidebar */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Account</h3>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition mb-2 ${
                  activeTab === "profile"
                    ? "bg-emerald-50 text-emerald-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <FiUser /> Profile
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition mb-2 ${
                  activeTab === "addresses"
                    ? "bg-emerald-50 text-emerald-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <FiMapPin /> Addresses
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
                  activeTab === "settings"
                    ? "bg-emerald-50 text-emerald-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <FiLock /> Security
              </button>
            </div>

            {/* Content */}
            <div>
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="max-w-xl">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Profile Information
                    </h2>
                    <p className="text-gray-500">
                      Update your personal details
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Personal Info</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                      >
                        {isEditingProfile ? "Cancel" : "Edit"}
                      </Button>
                    </div>

                    {isEditingProfile ? (
                      <form className="space-y-5">
                        <Input
                          label="Full Name"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              name: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-emerald-400 rounded-xl"
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
                          className="border-gray-200 focus:border-emerald-400 rounded-xl"
                        />
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
                          className="border-gray-200 focus:border-emerald-400 rounded-xl"
                        />
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            className="flex-1"
                            variant="outline"
                            onClick={() => setIsEditingProfile(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600"
                            onClick={async () => {
                              try {
                                const token =
                                  localStorage.getItem("token") ||
                                  useAuthStore.getState().token;
                                const response = await fetch(
                                  "https://ecommerce.routemisr.com/api/v1/users/updateMe",
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                      token: token,
                                    },
                                    body: JSON.stringify(profileForm),
                                  },
                                );

                                if (!response.ok) {
                                  const error = await response.json();
                                  throw new Error(
                                    error.message || "Update failed",
                                  );
                                }

                                alert("Profile updated successfully!");
                                setIsEditingProfile(false);
                              } catch (error: any) {
                                alert(
                                  error.message || "Error updating profile",
                                );
                              }
                            }}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4 text-lg">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <FiUser className="text-gray-400" />
                          <span>{authUser?.name || "No name set"}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <FiMapPin className="text-gray-400" />
                          <span>{authUser?.email || "No email set"}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <FiMapPin className="text-gray-400" />
                          <span>{profileForm.phone || "No phone set"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Saved Addresses
                      </h2>
                      <p className="text-gray-500">
                        Manage your shipping locations
                      </p>
                    </div>
                    <Button
                      onClick={() => handleOpenModal()}
                      className="flex items-center gap-2"
                    >
                      <FiPlus /> Add Address
                    </Button>
                  </div>

                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {addresses.map((address) => (
                        <motion.div
                          key={address._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3 items-center">
                              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <FiMapPin className="text-emerald-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {address.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {address.city}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal(address)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <FiEdit3 />
                              </button>
                              <button
                                onClick={() =>
                                  setShowDeleteConfirm(address._id)
                                }
                                className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {address.details}
                          </p>
                          <p className="text-sm text-gray-500">
                            {address.phone}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "settings" && (
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiUser className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{authUser?.name}</h3>
                      <p className="text-sm text-gray-500">{authUser?.email}</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-semibold mb-6">
                      Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <Input
                        type="password"
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value,
                          })
                        }
                        className="border-gray-200 focus:border-emerald-400 rounded-xl"
                      />
                      <Input
                        type="password"
                        placeholder="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        className="border-gray-200 focus:border-emerald-400 rounded-xl"
                      />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="border-gray-200 focus:border-emerald-400 rounded-xl"
                      />
                      <Button className="w-full mt-4">Update Password</Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Address Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingAddress ? "Edit Address" : "New Address"}
      >
        <form onSubmit={handleSubmitAddress} className="space-y-4">
          <Input
            label="Address Name"
            value={addressForm.name}
            onChange={(e) =>
              setAddressForm({ ...addressForm, name: e.target.value })
            }
          />
          <Input
            label="Street Address"
            value={addressForm.details}
            onChange={(e) =>
              setAddressForm({ ...addressForm, details: e.target.value })
            }
          />
          <Input
            label="Phone"
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
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingAddress ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Address?"
      >
        <div className="space-y-6 text-center">
          <p className="text-gray-600">This action cannot be undone.</p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={() =>
                showDeleteConfirm && handleDeleteAddress(showDeleteConfirm)
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
