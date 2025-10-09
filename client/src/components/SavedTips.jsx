import React, { useEffect, useState } from 'react';
import { getSavedTips } from './api';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SavedTips({ userId, refreshKey }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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
    load();
  }, [userId, refreshKey]);

  if (!userId) return null;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Saved Tips</h2>
        {loading ? <span>Loading…</span> : null}
        <IconButton color="primary" aria-label="Refresh saved tips" title="Refresh" onClick={() => setGoals([]) || setLoading(true) || getSavedTips(userId).then((res)=>{setGoals(res.goals||[])}).catch((e)=>setError(e.message||'Failed to load saved tips')).finally(()=>setLoading(false))} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </div>
      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
      <div style={{ display: 'grid', gap: 16 }}>
        {(goals || []).length === 0 ? <div>No saved tips yet.</div> : null}
        {(goals || []).map((g, gi) => (
          <div key={gi} style={{ border: '1px solid #ccc', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: 12, background: '#f7f7f7', borderBottom: '1px solid #e7e7e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700 }}>{g.name || 'Goal'}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{(g.saved_tasks || []).length} items</div>
            </div>
            <div style={{ display: 'grid', gap: 12, padding: 12 }}>
              {(g.saved_tasks || []).length === 0 ? (
                <div style={{ color: '#666' }}>No tasks saved for this goal.</div>
              ) : null}
              {(g.saved_tasks || []).map((t, ti) => (
                <div key={ti} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: '#444' }}>{t.icon_keyword}</div>
                  <details style={{ marginTop: 8 }}>
                    <summary>Details</summary>
                    <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{t.explanation_long}</div>
                    <ol>
                      {(t.steps || []).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </details>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


