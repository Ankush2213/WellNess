const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function saveProfile({ age, gender, goal }) {
  return request('/api/profile', {
    method: 'POST',
    body: JSON.stringify({ age, gender, goal }),
  });
}

export async function generateTips({ age, gender, goal }) {
  return request('/api/tips/generate', {
    method: 'POST',
    body: JSON.stringify({ age, gender, goal }),
  });
}

export async function getTipDetail({ age, gender, goal, tip_title }) {
  return request('/api/tips/detail', {
    method: 'POST',
    body: JSON.stringify({ age, gender, goal, tip_title }),
  });
}

export async function saveTip({ userId, tip }) {
  return request('/api/tips/save', {
    method: 'POST',
    body: JSON.stringify({ userId, tip }),
  });
}

export async function getSavedTips(userId) {
  return request(`/api/tips/saved/${userId}`);
}

export { API_BASE };


