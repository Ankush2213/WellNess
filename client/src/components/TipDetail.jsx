import React, { useEffect, useState } from 'react';
import { getTipDetail, saveTip } from './api';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Container,
  Chip,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DetailCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F6F3 100%)',
  padding: theme.spacing(2),
}));

const StepItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.secondary.light,
  border: `2px solid ${theme.palette.secondary.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    transform: 'translateX(8px)',
  },
}));

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light} 100%)`,
  padding: theme.spacing(4, 0),
}));

export default function TipDetail({ userId, age, gender, goal, tipTitle, onSaved }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!tipTitle) return;
      setError('');
      setLoading(true);
      try {
        const res = await getTipDetail({ age, gender, goal, tip_title: tipTitle });
        setDetail(res);
      } catch (err) {
        setError(err.message || 'Failed to load detail');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [age, gender, goal, tipTitle]);

  async function handleSave() {
    if (!userId || !detail) return;
    setError('');
    setSaving(true);
    try {
      await saveTip({
        userId,
        tip: {
          title: tipTitle,
          icon_keyword: detail.icon_keyword || 'wellness',
          explanation_long: detail.explanation_long,
          steps: detail.steps,
        },
      });
      if (onSaved) onSaved();
    } catch (err) {
      setError(err.message || 'Failed to save tip');
    } finally {
      setSaving(false);
    }
  }

  if (!tipTitle) return null;

  return (
    <PageContainer>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box textAlign="center">
            <Chip
              label="Wellness Tip"
              color="primary"
              sx={{ mb: 2 }}
            />
            <Typography variant="h3" color="primary" gutterBottom fontWeight={600}>
              {tipTitle}
            </Typography>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={48} />
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {detail && (
            <DetailCard elevation={0}>
              <CardContent>
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight={600} color="text.primary">
                      Overview
                    </Typography>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                      {detail.explanation_long}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight={600} color="text.primary">
                      Action Steps
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {(detail.steps || []).map((s, i) => (
                        <StepItem key={i} elevation={0}>
                          <ListItem disableGutters>
                            <CheckCircleOutlineIcon
                              sx={{ mr: 2, color: 'primary.main' }}
                            />
                            <ListItemText
                              primary={s}
                              primaryTypographyProps={{
                                variant: 'body1',
                                fontWeight: 500,
                              }}
                            />
                          </ListItem>
                        </StepItem>
                      ))}
                    </List>
                  </Box>

                  <Box display="flex" justifyContent="center" pt={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSave}
                      disabled={!userId || saving}
                      startIcon={<BookmarkAddIcon />}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      {saving ? 'Saving...' : 'Save to My Tips'}
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </DetailCard>
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
}
