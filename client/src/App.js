import React, { useEffect, useState } from 'react';
import './App.css';
import ProfileForm from './components/ProfileForm';
import TipsBoard from './components/TipsBoard';
import TipDetail from './components/TipDetail';
import SavedTips from './components/SavedTips';
import SavedTipsPage from './components/SavedTipsPage';
import ProfilePage from './components/ProfilePage';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import SpaIcon from '@mui/icons-material/Spa';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F0EB 100%)',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(10px)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  height: 40,
  borderRadius: 20,
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease',
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: '0 4px 12px rgba(139, 115, 85, 0.3)',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

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
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <StyledAppBar position="sticky" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <SpaIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h5" fontWeight={700} color="primary">
                  Wellness
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <NavButton
                  component={NavLink}
                  to="/"
                  end
                >
                  Home
                </NavButton>
                <NavButton
                  component={NavLink}
                  to="/profile"
                >
                  Profile
                </NavButton>
                <NavButton
                  component={NavLink}
                  to="/saved"
                >
                  Saved Tips
                </NavButton>
              </Box>
            </Toolbar>
          </Container>
        </StyledAppBar>

        <Box sx={{ py: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box>
                  {!profile && (
                    <ProfileForm
                      onSaved={(p) => {
                        setProfile(p);
                        window.localStorage.setItem('profile', JSON.stringify(p));
                      }}
                    />
                  )}
                  {profile && (
                    <Container maxWidth="lg">
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <TipsBoard
                          age={profile.age}
                          gender={profile.gender}
                          goal={profile.goal}
                          onSelect={(t) => setSelectedTip(t)}
                        />
                        {selectedTip && (
                          <TipDetail
                            userId={profile.userId}
                            age={profile.age}
                            gender={profile.gender}
                            goal={profile.goal}
                            tipTitle={selectedTip?.title}
                            onSaved={() => setSavedRefreshKey((k) => k + 1)}
                          />
                        )}
                        <SavedTips userId={profile.userId} refreshKey={savedRefreshKey} />
                      </Box>
                    </Container>
                  )}
                </Box>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved" element={<SavedTipsPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
