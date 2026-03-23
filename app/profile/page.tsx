"use client";

import { useState, useEffect } from "react";
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
  FiAlertTriangle,
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
    name: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  // تحديث الفورم من authUser
  useEffect(() => {
    console.log("Auth User Data:", authUser);
    if (authUser) {
      setProfileForm({
        name: authUser.name || "",
        email: authUser.email || "",
        phone: authUser.phone || "", // لو الـ authUser مش فيه phone، هيبقى فاضي
      });
    }
  }, [authUser]);

  // دالة لجلب بيانات المستخدم الكاملة من API
  const fetchUserProfile = async () => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) return;

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/profile",
        {
          headers: {
            token: token,
          },
        },
      );
      const data = await response.json();
      console.log("Profile API Response:", data);

      if (data.data) {
        setProfileForm({
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || "", // هنا المفروض يظهر رقم التليفون
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // جلب البروفايل عند تحميل الصفحة
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileError("");
    setProfileSuccess("");

    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        setProfileError("Authentication token not found");
        return;
      }

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            name: profileForm.name,
            phone: profileForm.phone,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setProfileSuccess("Profile updated successfully!");
        useAuthStore.getState().setUser(result.data);
      } else {
        let errorMsg = "Error updating profile";
        if (result.message === "fail" && result.errors?.length > 0) {
          errorMsg = result.errors[0].msg;
        } else if (result.message) {
          errorMsg = result.message;
        }
        setProfileError(errorMsg);
      }
    } catch (err) {
    } finally {
      setIsUpdatingProfile(false);
    }
  };

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

    if (editingAddress) {
      updateMutation.mutate(
        { id: editingAddress._id, data: addressForm },
        {
          onSuccess: () => {
            handleCloseModal();
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
    setPasswordError("");
    setIsUpdatingPassword(true);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        setPasswordError("Authentication token not found");
        return;
      }

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
          body: JSON.stringify({
            currentPassword: passwordForm.currentPassword,
            password: passwordForm.newPassword,
            rePassword: passwordForm.confirmPassword,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        alert("Password updated successfully!");
      } else {
        let errorMsg = "Error updating password";
        if (
          result.message === "fail" &&
          result.errors &&
          result.errors.length > 0
        ) {
          errorMsg = result.errors[0].msg;
        } else if (result.message) {
          errorMsg = result.message;
        }
        setPasswordError(errorMsg);
      }
    } catch (err) {
      setPasswordError("Network error. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[250px_1fr] gap-10 items-start">
            {/* Sidebar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 h-fit sticky top-24">
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
                    onClick={() =>
                      setActiveTab(item.key as "addresses" | "settings")
                    }
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition mb-2 ${
                      activeTab === item.key
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 border border-transparent"
                    } border hover:border-emerald-200`}
                  >
                    <Icon className="text-lg flex-shrink-0" />
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
                      <h2 className="text-2xl lg:text-3xl font-black">
                        My Addresses
                      </h2>
                      <p className="text-lg text-gray-500 mt-1">
                        Manage your saved delivery addresses
                      </p>
                    </div>

                    <Button
                      onClick={() => handleOpenModal()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                    >
                      <FiPlus />
                      Add Address
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse shadow-sm"
                        >
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                      <FiMapPin className="text-6xl text-gray-300 mb-6" />

                      <h3 className="text-2xl font-bold text-gray-700 mb-3">
                        No addresses yet
                      </h3>

                      <p className="text-lg text-gray-500 mb-8 max-w-md">
                        Add your first delivery address to get started
                      </p>

                      <Button
                        onClick={() => handleOpenModal()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl font-semibold text-lg"
                      >
                        <FiPlus />
                        Add Address
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <motion.div
                          key={address._id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -4 }}
                          className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                              <FiMapPin className="text-emerald-600 text-xl" />
                            </div>

                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-1">
                                {address.name}
                              </h4>

                              {updateMutation.isPending &&
                                address._id === editingAddress?._id && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium mb-2 animate-pulse">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                    Updating...
                                  </span>
                                )}

                              <p className="text-lg font-semibold text-gray-700">
                                {address.phone}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {address.city} • {address.details}
                              </p>
                            </div>

                            <div className="flex gap-2 ml-auto">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenModal(address)}
                                className="flex items-center gap-1 hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300"
                              >
                                <FiEdit3 size={16} />
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteAddress(address._id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                              >
                                <FiTrash2 size={16} />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-8">
                  {/* Profile Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg">
                        <FiUser className="text-white text-xl" />
                      </div>

                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-gray-900">
                          Profile Information
                        </h3>
                        <p className="text-lg text-gray-500 mt-1">
                          Update your personal details
                        </p>
                      </div>
                    </div>

                    {/* رسائل الخطأ/النجاح */}
                    {profileError && (
                      <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 shadow-lg flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <FiAlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-red-700 text-sm">{profileError}</p>
                      </div>
                    )}

                    {profileSuccess && (
                      <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4 shadow-lg flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <FiSave className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-emerald-700 text-sm">
                          {profileSuccess}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleProfileUpdate}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name *"
                          placeholder="Enter your full name"
                          className="focus:ring-emerald-500 focus:border-emerald-500"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            className="focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                            value={profileForm.email}
                            disabled
                            readOnly
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Email cannot be changed
                          </p>
                        </div>

                        <Input
                          label="Phone Number"
                          placeholder="01xxxxxxxxx"
                          className="focus:ring-emerald-500 focus:border-emerald-500"
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiSave />
                        {isUpdatingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </motion.div>

                  {/* Change Password */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <FiLock className="text-white text-xl" />
                      </div>

                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-gray-900">
                          Change Password
                        </h3>
                        <p className="text-lg text-gray-500 mt-1">
                          Update your account security
                        </p>
                      </div>
                    </div>

                    {passwordError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 mb-8 shadow-lg flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mt-0.5">
                          <FiAlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-red-800 text-sm mb-1">
                            Error!
                          </h4>
                          <p className="text-red-700 text-sm leading-relaxed">
                            {passwordError}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      {["current", "new", "confirm"].map((type, i) => {
                        const label = [
                          "Current Password *",
                          "New Password *",
                          "Confirm Password *",
                        ][i];

                        const field = [
                          "currentPassword",
                          "newPassword",
                          "confirmPassword",
                        ][i];

                        const placeholder = [
                          "Enter your current password",
                          "Enter your new password (min 6 chars)",
                          "Confirm your new password",
                        ][i];

                        return (
                          <div key={type}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all shadow-sm hover:shadow-md bg-white/50 backdrop-blur-sm text-base placeholder-gray-400"
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
                                minLength={6}
                                required={type !== "confirm"}
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
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg"
                              >
                                {showPassword[
                                  type as keyof typeof showPassword
                                ] ? (
                                  <FiEyeOff size={18} />
                                ) : (
                                  <FiEye size={18} />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <Button
                        type="submit"
                        disabled={isUpdatingPassword}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <FiLock />
                        {isUpdatingPassword ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </motion.div>
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {editingAddress ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
