import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

let ErrorRate = new Rate('error_rate');

// Configuración de ramp-up, steady state y ramp-down
export const options = {
  stages: [
    { target: 10, duration: '30s' },  // Ramp-up: subir hasta 10 VUs
    { target: 20, duration: '60s' },  // Steady state: mantener 20 VUs (~20 TPS)
    { target: 0, duration: '30s' },   // Ramp-down: bajar a 0
  ],
  thresholds: {
    http_req_duration: ['avg <= 1500'], // tiempo de respuesta promedio <= 1.5s
    http_req_failed: ['rate <= 0.03'],  // tasa de error <= 3%
    iterations: ['rate >= 20'],         // throughput mínimo de 20 TPS
  },
};

// Cargar datos desde CSV externo
const csvDataLogin = new SharedArray('usuarios', function () {
  return papaparse.parse(open('../data/usuarios.csv'), { header: true }).data;
});

export default function () {
  const url = 'https://fakestoreapi.com/auth/login';

  // Seleccionar un registro aleatorio del CSV
  const index = Math.floor(Math.random() * csvDataLogin.length);
  const username = csvDataLogin[index]['user'];
  const password = csvDataLogin[index]['passwd'];

  const payload = JSON.stringify({
    username: username,
    password: password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  const ok = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  if (!ok) {
    ErrorRate.add(1);
    console.log(`Error response: ${res.body}`);
  } else {
    ErrorRate.add(0);
  }

  sleep(randomIntBetween(1, 3)); // espera aleatoria
}