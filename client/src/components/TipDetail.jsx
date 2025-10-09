import React, { useEffect, useState } from 'react';
import { getTipDetail, saveTip } from './api';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

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
          icon_keyword: (detail.icon_keyword || 'wellness'),
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
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ m: 0 }}>{tipTitle}</Typography>
          {loading ? <Box><CircularProgress size={20} /></Box> : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          {detail ? (
            <>
              <Typography whiteSpace="pre-wrap" lineHeight={1.6}>
                {detail.explanation_long}
              </Typography>
              <Divider />
              <List>
                {(detail.steps || []).map((s, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={`${i + 1}. ${s}`} />
                  </ListItem>
                ))}
              </List>
              <Box>
                <Button onClick={handleSave} disabled={saving || !userId} color="primary" sx={{ minWidth: 120, height: 36 }}>
                  {saving ? 'Saving…' : 'Save Tip'}
                </Button>
              </Box>
            </>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}


