import React from 'react';
import SavedTips from './SavedTips';

export default function SavedTipsPage() {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('profile') : null;
  const profile = stored ? JSON.parse(stored) : null;
  const userId = profile?.userId;

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Your Saved Tips</h2>
      {userId ? (
        <SavedTips userId={userId} />
      ) : (
        <div>Please create a profile first to view saved tips.</div>
      )}
    </div>
  );
}


