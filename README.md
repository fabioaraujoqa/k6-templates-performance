# k6 — Testes de Performance: QuickPizza 🍕

Templates prontos para testar performance contra [QuickPizza](https://quickpizza.grafana.com) (API pública do Grafana Labs) ou localmente via Docker.

## Instalação

```bash
# k6
brew install k6       # macOS
sudo apt-get install k6  # Linux

# Docker (opcional)
docker --version      # Certifique-se que tem instalado
```

## Execução Rápida

### 1️⃣ Com a API pública (Grafana Labs)

```bash
k6 run 01-smoke.js      # Smoke test (30 seg)
k6 run 02-load.js       # Load test (4 min)
k6 run 03-stress.js     # Stress test (5 min)
k6 run 05-spike.js      # Spike test (4 min)
```

### 2️⃣ Com Docker (recomendado para Stress/Soak/Breakpoint)

```bash
# Terminal 1: Inicie o QuickPizza localmente
docker run -p 3333:3333 ghcr.io/grafana/quickpizza:latest

# Terminal 2: Execute os testes
k6 run -e BASE_URL=http://localhost:3333 01-smoke.js
k6 run -e BASE_URL=http://localhost:3333 03-stress.js
k6 run -e BASE_URL=http://localhost:3333 04-soak.js
```

## Testes Disponíveis

| Arquivo | Tipo | Propósito | Duração |
|---|---|---|---|
| `01-smoke.js` | Smoke | Validação rápida | 30s |
| `02-load.js` | Load | Carga média simulada | 4 min |
| `03-stress.js` | Stress | Sistema sob pressão | 5 min |
| `04-soak.js` | Soak | Resistência prolongada | 5 min* |
| `05-spike.js` | Spike | Pico repentino de usuários | 4 min |
| `06-breakpoint.js` | Breakpoint | Encontrar o limite máximo | 10 min* |

*Customize com variáveis de ambiente (veja abaixo)

## Variáveis de Ambiente

```bash
# URL da API (padrão: https://quickpizza.grafana.com)
k6 run -e BASE_URL=http://localhost:3333 04-soak.js

# Duração do soak test (padrão: 5 min)
k6 run -e SOAK_DURATION=10m 04-soak.js

# Combinado
k6 run -e BASE_URL=http://localhost:3333 -e SOAK_DURATION=1h 04-soak.js
```

Veja [.env.example](.env.example) para todas as opções.

## Roteiro Sugerido para Palestra

```bash
# 1. Validar que funciona
k6 run 01-smoke.js

# 2. Simular carga normal
k6 run 02-load.js

# 3. Empurrar o sistema
k6 run 03-stress.js

# 4. Simular pico de usuários
k6 run 05-spike.js

# 5. (Opcional) Rodar até quebrar
k6 run 06-breakpoint.js
```

## Interpretar Resultados

```
✓ checks : checks que passaram
✗ checks : 0 significa zero erros

http_req_duration  : latência das requisições
  p(95) = percentil 95 — 95% das requisições são mais rápidas que isso
  p(99) = percentil 99

http_req_failed    : taxa de erro
  0% = perfeito | > 1% = problema
```

## Troubleshooting

**"API Error: 401"** → API requer autenticação. Use Docker localmente.

**"Connection refused"** → Docker não está rodando. Execute:
```bash
docker run -p 3333:3333 ghcr.io/grafana/quickpizza:latest
```

**Alterar duração de um teste** → Edite o arquivo `.js` ou customize no comando:
```bash
k6 run -e SOAK_DURATION=30s 04-soak.js  # Teste rápido
```

## Gerar Relatórios HTML

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=load-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run 03-stress.js
```
