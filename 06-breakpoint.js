import http from 'k6/http';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  executor: 'ramping-arrival-rate', // controla o número de requisições por segundo e não o número de VUs
  stages: [
    { duration: '2h', target: 20000 }, 
  ],
};

export default function () {
  http.post(
    `${BASE_URL}/api/pizza`,
    JSON.stringify({ maxCaloriesPerSlice: 500 }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

export function teardown() {
  console.log('\n Breakpoint test finalizado\n');
}
