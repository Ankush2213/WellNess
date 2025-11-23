import React, { useEffect, useState } from 'react';
import { getSavedTips } from './api';
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  Container,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const SavedCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F0EB 100%)',
  marginBottom: theme.spacing(2),
}));

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light} 100%)`,
  padding: theme.spacing(4, 0),
}));

export default function SavedTips({ userId, refreshKey }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    if (!userId) return;
    setError('');
    setLoading(true);
    try {
      const res = await getSavedTips(userId);
      setGoals(res.goals || []);
    } catch (err) {
      setError(err.message || 'Failed to load saved tips');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [userId, refreshKey]);

  if (!userId) return null;

  return (
    <PageContainer>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h2" color="primary" gutterBottom fontWeight={600}>
                My Saved Tips
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your personalized wellness collection
              </Typography>
            </Box>
            <IconButton
              onClick={load}
              disabled={loading}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={48} />
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && goals.length === 0 && (
            <Alert severity="info">
              No saved tips yet. Start generating and saving tips from your dashboard!
            </Alert>
          )}

          <Stack spacing={3}>
            {goals.map((g, idx) => (
              <SavedCard key={idx} elevation={0}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BookmarkIcon color="primary" />
                      <Chip label={g.goal} color="primary" size="small" />
                    </Box>

                    {(g.tips || []).map((t, i) => (
                      <Accordion
                        key={i}
                        sx={{
                          borderRadius: 2,
                          '&:before': { display: 'none' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6" fontWeight={600}>
                            {t.title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack spacing={2}>
                            <Typography variant="body1" color="text.secondary">
                              {t.explanation_long}
                            </Typography>
                            {(t.steps || []).length > 0 && (
                              <Box>
                                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                  Steps:
                                </Typography>
                                <Stack spacing={1}>
                                  {t.steps.map((step, si) => (
                                    <Typography
                                      key={si}
                                      variant="body2"
                                      sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main' }}
                                    >
                                      {step}
                                    </Typography>
                                  ))}
                                </Stack>
                              </Box>
                            )}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </CardContent>
              </SavedCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </PageContainer>
  );
}
