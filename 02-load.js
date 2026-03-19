import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  group('Pizza', () => {
    http.post(
      `${BASE_URL}/api/pizza`,
      JSON.stringify({ maxCaloriesPerSlice: 800 }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  group('Ingredientes', () => {
    http.get(`${BASE_URL}/api/ingredients`);
  });

  sleep(Math.random() * 2 + 1);
}
