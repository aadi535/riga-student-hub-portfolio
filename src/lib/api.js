const base = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
export const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
let csrf;
export async function api(path, { method = 'GET', body, idempotencyKey, form = false } = {}) {
  if (demoMode) throw new Error('Sample preview: personal data is not collected.');
  const headers = {};
  if (method !== 'GET') {
    if (!csrf) {
      const response = await fetch(`${base}/csrf`, { credentials: 'include' });
      if (!response.ok) throw new Error('Could not establish a secure session. Refresh and retry.');
      csrf = await response.json();
    }
    headers[csrf.headerName] = csrf.token;
    if (body) headers['Content-Type'] = form ? 'application/x-www-form-urlencoded' : 'application/json';
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
  }
  let response;
  try {
    response = await fetch(`${base}${path}`, { method, credentials: 'include', headers,
      body: body ? (form ? new URLSearchParams(body).toString() : JSON.stringify(body)) : undefined,
      signal: AbortSignal.timeout(20000) });
  } catch { throw new Error('The server has not confirmed your request. Keep this form open and retry; the same submission will not be saved twice.'); }
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (path === '/manager/login' || path === '/manager/logout' || response.status === 403) csrf = undefined;
  if (!response.ok) { const error = new Error(data?.message || 'Service unavailable. Please try again.'); error.status = response.status; throw error; }
  return data;
}
