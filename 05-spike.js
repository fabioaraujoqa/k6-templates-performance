import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '10s', target: 500 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 0 },
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
