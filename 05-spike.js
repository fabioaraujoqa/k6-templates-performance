import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '1m', target: 5 },
    { duration: '10s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '10s', target: 5 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  http.post(
    `${BASE_URL}/api/pizza`,
    JSON.stringify({ maxCaloriesPerSlice: Math.random() * 1000 }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  sleep(Math.random() * 0.5);
}
