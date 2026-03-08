// Profile Page
'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

