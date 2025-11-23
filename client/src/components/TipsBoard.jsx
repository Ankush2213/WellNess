import React, { useState } from 'react';
import { generateTips } from './api';
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
  Box,
  Chip,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const TipCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
}));

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light} 100%)`,
  padding: theme.spacing(4, 0),
}));

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
    <PageContainer>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h2" color="primary" gutterBottom fontWeight={600}>
              Your Personalized Tips
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              AI-powered wellness recommendations tailored just for you
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={loadTips}
              disabled={loading}
              startIcon={<AutoAwesomeIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              {loading ? 'Generating Tips...' : 'Generate Wellness Tips'}
            </Button>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          {tips.length > 0 && (
            <Grid container spacing={3}>
              {tips.map((t) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={t.tip_id}>
                  <TipCard>
                    <CardActionArea onClick={() => onSelect && onSelect(t)}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <FitnessCenterIcon color="primary" />
                            <Chip
                              label={`Tip #${t.tip_id}`}
                              size="small"
                              color="secondary"
                            />
                          </Box>
                          <Typography variant="h6" fontWeight={600} color="text.primary">
                            {t.title}
                          </Typography>
                          <Chip
                            label={t.icon_keyword}
                            size="small"
                            sx={{
                              alignSelf: 'flex-start',
                              backgroundColor: 'primary.light',
                              color: 'white',
                            }}
                          />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </TipCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
}
