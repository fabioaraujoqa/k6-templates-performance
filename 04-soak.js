import http from 'k6/http';
import { group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '4h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};

export function setup() {
  console.log('✅ Iniciando soak test...');
}

export default function () {
  group('Pizza', () => {
    http.post(
      `${BASE_URL}/api/pizza`,
      JSON.stringify({ maxCaloriesPerSlice: 600 }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  group('Ingredientes', () => {
    http.get(`${BASE_URL}/api/ingredients`);
  });

  sleep(Math.random() * 3 + 2);
}

export function teardown() {
  console.log('Soak test finalizado');
}
