import React, { useState } from 'react';
import { generateTips } from './api';
import { Alert, Button, Card, CardActionArea, CardContent, Grid2 as Grid, Stack, Typography } from '@mui/material';

export default function TipsBoard({ age, gender, goal, onSelect }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTips() {
    setError('');
    setLoading(true);
    try {
      const res = await generateTips({ age, gender, goal });
      setTips(res.tips || []);
    } catch (err) {
      setError(err.message || 'Failed to load tips');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Button onClick={loadTips} disabled={loading} color="primary" sx={{ minWidth: 120, height: 36 }}>
          {loading ? 'Loading…' : 'Generate Tips'}
        </Button>
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <Grid container spacing={2}>
        {tips.map((t) => (
          <Grid key={t.tip_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined" sx={{
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': { transform: 'rotate3d(1, 1, 0, 6deg)', boxShadow: 8 }
            }}>
              <CardActionArea onClick={() => onSelect && onSelect(t)}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">#{t.tip_id}</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>{t.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{t.icon_keyword}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}


