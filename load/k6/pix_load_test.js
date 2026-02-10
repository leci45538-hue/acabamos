import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // fluxo minimal: health check + criar pagamento PIX (API simulada)
  let r = http.get(`${BASE}/api/health`);
  check(r, { 'health ok': (res) => res.status === 200 });

  // criar pagamento (POST) - ajustar payload conforme API
  const payload = JSON.stringify({ bookingId: 1, amount: 1000 });
  const params = { headers: { 'Content-Type': 'application/json' } };
  let p = http.post(`${BASE}/api/pix/create`, payload, params);
  check(p, { 'create payment': (res) => res.status === 201 || res.status === 200 });

  sleep(1);
}
