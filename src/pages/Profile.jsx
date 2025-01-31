import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { payload } = await dispatch(fetchProfile());
        setProfile(payload);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-lg">
        <div className="flex flex-col lg:flex-row items-center p-8">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md mb-6 lg:mb-0 lg:mr-8"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-blue-900">{profile.name}</h1>
            <p className="text-lg text-gray-700 mt-1">{profile.email}</p>
            <span className="mt-3 bg-blue-300 text-blue-900 text-sm px-4 py-1 rounded-full font-medium inline-block shadow-md">
              Role: {profile.role}
            </span>
          </div>
        </div>

        <div className="p-8 bg-gray-100">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border-l-4 border-blue-500 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-blue-600">Full Name</h3>
              <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-blue-500 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-blue-600">Email Address</h3>
              <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-blue-500 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-blue-600">Role</h3>
              <p className="text-lg font-semibold text-gray-800">{profile.role}</p>
            </div>
            <div className="bg-white p-6 border-l-4 border-blue-500 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-blue-600">User ID</h3>
              <p className="text-lg font-semibold text-gray-800">{profile.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
