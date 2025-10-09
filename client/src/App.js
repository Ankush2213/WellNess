import React, { useEffect, useState } from 'react';
import './App.css';
import ProfileForm from './components/ProfileForm';
import TipsBoard from './components/TipsBoard';
import TipDetail from './components/TipDetail';
import SavedTips from './components/SavedTips';
import SavedTipsPage from './components/SavedTipsPage';
import ProfilePage from './components/ProfilePage';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  const [profile, setProfile] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [savedRefreshKey, setSavedRefreshKey] = useState(0);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('profile') : null;
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  return (
    <BrowserRouter>
      <div className="App" style={{ padding: 16 }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={2}
          sx={{
            mb: 2,
            borderRadius: 2,
            background: 'linear-gradient(90deg, rgba(167,232,189,0.7) 0%, rgba(76,175,157,0.7) 100%)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Wellness Board</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={NavLink}
                to="/"
                color="primary"
                sx={{
                  minWidth: 120,
                  height: 36,
                  '&.active': { bgcolor: 'primary.main', color: 'common.white' }
                }}
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/profile"
                color="primary"
                sx={{
                  minWidth: 120,
                  height: 36,
                  '&.active': { bgcolor: 'primary.main', color: 'common.white' }
                }}
              >
                Profile
              </Button>
              <Button
                component={NavLink}
                to="/saved"
                color="primary"
                sx={{
                  minWidth: 120,
                  height: 36,
                  '&.active': { bgcolor: 'primary.main', color: 'common.white' }
                }}
              >
                Saved Tips
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {!profile && <ProfileForm onSaved={(p)=>{ setProfile(p); window.localStorage.setItem('profile', JSON.stringify(p)); }} />}
                {profile && (
                  <div style={{ display: 'grid', gap: 24 }}>
                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button component={Link} to="/saved" color="primary" sx={{ minWidth: 120, height: 36 }}>
                        View Saved Tips
                      </Button>
                    </div> */}
                    <TipsBoard
                      age={profile.age}
                      gender={profile.gender}
                      goal={profile.goal}
                      onSelect={(t) => setSelectedTip(t)}
                    />
                    <TipDetail
                      userId={profile.userId}
                      age={profile.age}
                      gender={profile.gender}
                      goal={profile.goal}
                      tipTitle={selectedTip?.title}
                      onSaved={() => setSavedRefreshKey((k) => k + 1)}
                    />
                    <SavedTips userId={profile.userId} refreshKey={savedRefreshKey} />
                  </div>
                )}
              </div>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved" element={<SavedTipsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
