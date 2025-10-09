import React from 'react';
import ProfileForm from './ProfileForm';

export default function ProfilePage() {
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Your Profile</h2>
      <ProfileForm onSaved={(profile) => {
        window.localStorage.setItem('profile', JSON.stringify(profile));
        window.location.href = '/';
      }} />
    </div>
  );
}
