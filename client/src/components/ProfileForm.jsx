import React, { useState } from 'react';
import { saveProfile } from './api';
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Alert } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 520, mx: 'auto' }}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Profile</Typography>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              type="number"
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              fullWidth
            />
            <Box>
              <Button type="submit" color="primary" disabled={loading} sx={{ minWidth: 120, height: 36 }}>
                {loading ? 'Saving…' : 'Save Profile'}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}


