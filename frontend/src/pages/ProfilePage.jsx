import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera } from 'lucide-react';
import './profile.css';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // Guard while authUser is loading or null
  if (!authUser) return <div>Loading profile...</div>;

  const status = (authUser.status || '').toLowerCase();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Your Profile Information</p>
      </div>

      {/* Avatar upload */}
      <div className="avatar-section">
        <div className="avatar-wrapper">
          <img
            src={selectedImg || authUser.profilepic || '/avatar.png'}
            alt="profile"
            className="avatar-img"
          />
          <label
            htmlFor="avatar-upload"
            className={`avatar-upload-btn ${isUpdatingProfile ? 'disabled' : ''}`}
          >
            <Camera className="camera-icon" />
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="upload-status">
          {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your profile'}
        </p>
      </div>

      {/* User Info */}
      <div className="user-info">
        {/* Full Name */}
        <div className="info-item">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={authUser.fullName || 'Not Provided'}
            readOnly
            className="readonly-input"
          />
        </div>

        {/* Email */}
        <div className="info-item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={authUser.email || 'Not Provided'}
            readOnly
            className="readonly-input"
          />
        </div>

        {/* Account Info */}
        <div className="account-box">
          <h4>Account Information</h4>

          {/* Member Since */}
          <div className="info-item display-item">
            <label>Member Since</label>
            <span>
              {authUser.createdAt
                ? new Date(authUser.createdAt).toLocaleDateString()
                : 'Unknown'}
            </span>
          </div>

          {/* Account Status */}
          <div className="info-item display-item">
            <label>Account Status</label>
            <span
              className={`status-pill ${
                status === 'active' ? 'status-active' : 'status-inactive'
              }`}
            >
              {status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
