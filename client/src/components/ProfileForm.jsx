import React, { useState } from 'react';
import { saveProfile } from './api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F0EB 100%)',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light} 100%)`,
}));

export default function ProfileForm({ onSaved }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const parsedAge = Number(age);
      const { userId } = await saveProfile({ age: parsedAge, gender, goal });
      if (onSaved) onSaved({ userId, age: parsedAge, gender, goal });
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormContainer>
      <Container maxWidth="sm">
        <StyledCard elevation={0}>
          <CardContent>
            <Stack spacing={3}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h3" color="primary" gutterBottom fontWeight={600}>
                  Welcome to Wellness
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create your personalized wellness profile
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    fullWidth
                    placeholder="Enter your age"
                    InputProps={{
                      sx: { fontSize: '1rem' },
                    }}
                  />

                  <TextField
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    fullWidth
                    placeholder="e.g., Male, Female, Non-binary"
                    InputProps={{
                      sx: { fontSize: '1rem' },
                    }}
                  />

                  <TextField
                    label="Wellness Goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="What are your wellness goals? (e.g., Better sleep, fitness, stress management)"
                    InputProps={{
                      sx: { fontSize: '1rem' },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2, py: 1.5 }}
                  >
                    {loading ? 'Saving Profile...' : 'Start Your Journey'}
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </StyledCard>
      </Container>
    </FormContainer>
  );
}
