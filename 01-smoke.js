import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  vus: 2,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
  },
};

export default function () {
  // Teste 1: Health check
  http.get(`${BASE_URL}/api/ready`);

  // Teste 2: Fazer pedidos de pizza
  http.post(
    `${BASE_URL}/api/pizza`,
    JSON.stringify({ maxCaloriesPerSlice: 500 }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  // Teste 3: Listar ingredientes
  http.get(`${BASE_URL}/api/ingredients`);

  sleep(1);
}
